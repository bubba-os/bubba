"use client";

import { joinWaitlist } from "@/app/actions/waitlist";
import { env } from "@/env.mjs";
import { Button } from "@bubba-beta/ui/button";
import { Input } from "@bubba-beta/ui/input";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface Turnstile {
  render: (
    container: Element,
    options: {
      sitekey: string;
      callback: (token: string) => void;
    },
  ) => void;
  reset: () => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Joining..." : "Join Waitlist"}
    </Button>
  );
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const waitlistAction = useAction(joinWaitlist, {
    onSuccess: () => {
      toast.success("Successfully joined the waitlist!");
      setEmail("");

      if (window.turnstile) {
        window.turnstile.reset();
      }
    },
    onError: (error) => {
      toast.error("Something went wrong, please try again.");
    },
  });

  useEffect(() => {
    const turnstileContainers = document.querySelectorAll(".cf-turnstile");
    for (const container of turnstileContainers) {
      container.innerHTML = "";
      if (window.turnstile) {
        window.turnstile.render(container, {
          sitekey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            const tokenInput = document.getElementById(
              "cf-turnstile-response",
            ) as HTMLInputElement;
            if (tokenInput) tokenInput.value = token;
          },
        });
      }
    }
  }, [pathname]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const cfToken = (
      form.querySelector("#cf-turnstile-response") as HTMLInputElement
    )?.value;

    if (!cfToken) {
      toast.error("Please complete the captcha");
      return;
    }

    await waitlistAction.execute({
      email,
      cfToken,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <SubmitButton />

      <input
        type="hidden"
        id="cf-turnstile-response"
        name="cf-turnstile-response"
      />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <div
        className="cf-turnstile"
        data-sitekey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
    </form>
  );
}

"use client";

import { waitlistSchema } from "@/app/actions/schema";
import { joinWaitlist } from "@/app/actions/waitlist";
import { Button } from "@bubba-beta/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bubba-beta/ui/form";
import { Input } from "@bubba-beta/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Turnstile } from "next-turnstile";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function WaitlistForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [error, setError] = useState<string | null>(null);

  const waitlistAction = useAction(joinWaitlist, {
    onSuccess: () => {
      toast.success("Successfully joined the waitlist!");
      form.reset();
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      cfToken: "",
    },
  });

  const onSubmit = (data: z.infer<typeof waitlistSchema>) => {
    if (turnstileStatus !== "success") {
      setError("Please verify you are not a robot");
      return;
    }

    waitlistAction.execute({
      email: data.email,
      cfToken: data.cfToken,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  placeholder="Enter your email"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex">
          <Button type="submit" disabled={waitlistAction.isExecuting}>
            <div className="flex items-center justify-center">
              Join Waitlist
            </div>
          </Button>
        </div>

        <FormField
          control={form.control}
          name="cfToken"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormControl>
                <Turnstile
                  {...field}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  retry="auto"
                  refreshExpired="auto"
                  sandbox={process.env.NODE_ENV === "development"}
                  onError={() => {
                    setTurnstileStatus("error");
                    setError("Security check failed. Please try again.");
                  }}
                  onExpire={() => {
                    setTurnstileStatus("expired");
                    setError("Security check expired. Please verify again.");
                  }}
                  onLoad={() => {
                    setTurnstileStatus("required");
                    setError(null);
                  }}
                  onVerify={(token) => {
                    onChange(token);
                    setTurnstileStatus("success");
                    setError(null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
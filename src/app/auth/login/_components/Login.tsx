"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useState } from "react";

import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import Google from "@/components/shared/icons/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { next } = useParams as { next?: string };

  const [isLoginWithEmail, setIsLoginWithEmail] = useState<boolean>(false);
  const [isLoginWithGoogle, setIsLoginWithGoogle] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailButtonText, setEmailButtonText] = useState<string>(
    "Continue with Email",
  );

  return (
    <div className="flex h-screen w-full flex-wrap">
      <div className="flex w-full justify-center">
        <div
          className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        ></div>
        <div className="z-10 mx-5 mt-[calc(20vh)] h-fit w-full max-w-md overflow-hidden rounded-lg sm:mx-0">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
            <Link href="/">
              <span className="text-balance text-2xl font-semibold">
                Welcome to Bubba
              </span>
            </Link>
            <h3 className="text-balance text-sm">
              The free and open source compliance platform.
            </h3>
          </div>
          <form
            className="flex flex-col gap-4 px-4 pt-8 sm:px-16"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoginWithEmail(true);
              await signIn("email", {
                email: email,
                redirect: false,
                ...(next && next.length > 0 ? { callbackUrl: next } : {}),
              })
                .then((res) => {
                  if (res?.ok && !res?.error) {
                    setEmail("");
                    setEmailButtonText("Email sent - check your inbox!");
                    toast.success("Email sent - check your inbox!");
                  } else {
                    setEmailButtonText("Error sending email - try again?");
                    toast.error("Error sending email - try again?");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  toast.error("Error sending email - try again?");
                })
                .finally(() => {
                  setIsLoginWithEmail(false);
                });
            }}
          >
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoginWithEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" loading={isLoginWithEmail}>
              {emailButtonText}
            </Button>
          </form>
          <p className="py-4 text-center text-muted-foreground">or</p>
          <div className="flex flex-col space-y-2 px-4 sm:px-16">
            <Button
              onClick={async () => {
                setIsLoginWithGoogle(true);
                await signIn("google", {
                  ...(next && next.length > 0 ? { callbackUrl: next } : {}),
                }).then((res) => {
                  if (res?.status) {
                    setIsLoginWithGoogle(false);
                  }
                });
              }}
              disabled={isLoginWithGoogle}
              className="flex items-center justify-center space-x-2"
            >
              {isLoginWithGoogle ? (
                <Loader className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Google className="h-5 w-5" />
              )}
              <span>Continue with Google</span>
            </Button>
          </div>
          <p className="mt-10 w-full max-w-md px-4 text-xs text-muted-foreground sm:px-16">
            By clicking continue, you acknowledge that you have read and agree
            to Bubba&apos;s{" "}
            <Link href="/" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

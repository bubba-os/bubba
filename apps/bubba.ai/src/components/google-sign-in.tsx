"use client";

import { ButtonIcon } from "@/components/ui/button-icon";
import { Button } from "@bubba-beta/ui/button";
import { Icons } from "@bubba-beta/ui/icons";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleSignIn() {
  const [isLoading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);

    await signIn("google", {
      redirectTo: "/",
    });
  };

  return (
    <Button
      onClick={handleSignIn}
      className="flex h-[40px] w-full space-x-2 bg-primary px-6 py-4 font-medium text-secondary active:scale-[0.98]"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <ButtonIcon className="mr-2" isLoading={isLoading}>
            <Icons.Google />
          </ButtonIcon>
          <span>Continue with Google</span>
        </>
      )}
    </Button>
  );
}

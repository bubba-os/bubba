import { auth } from "@/auth";
import { GoogleSignIn } from "@/components/google-sign-in";
import { MagicLinkSignIn } from "@/components/magic-link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bubba-beta/ui/accordion";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Bubba AI",
};

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  const defaultSignInOptions = (
    <div className="flex flex-col space-y-2">
      <GoogleSignIn />
    </div>
  );

  const moreSignInOptions = (
    <>
      <MagicLinkSignIn />
    </>
  );
  return (
    <div>
      <div className="flex min-h-[calc(100vh-15rem)] items-center justify-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
          <div className="relative flex w-full flex-col">
            <div className="inline-block from-primary bg-clip-text pb-4">
              <div className="flex flex-row items-center gap-2">
                <Link href="/" className="flex flex-row items-center gap-2">
                  <h1 className="font-mono text-xl font-semibold">Bubba AI</h1>
                </Link>
              </div>
              <h2 className="mt-4 text-lg font-medium">
                Automate SOC 2, ISO 27001 and GDPR compliance with AI.
              </h2>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">
                  Create a free account or log in with an existing account to
                  continue.
                </span>
              </div>
            </div>

            <div className="pointer-events-auto mb-6 flex flex-col">
              {defaultSignInOptions}
              <Accordion
                type="single"
                collapsible
                className="mt-6 border-t-[1px] pt-2"
              >
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="flex justify-center space-x-2 text-sm">
                    <span>More options</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    <div className="flex flex-col space-y-4">
                      {moreSignInOptions}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <p className="text-xs text-muted-foreground">
              By clicking continue, you acknowledge that you have read and agree
              to the{" "}
              <Link href="/legal/terms-of-service" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/legal/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

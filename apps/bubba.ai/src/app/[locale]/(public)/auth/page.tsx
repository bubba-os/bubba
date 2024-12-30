import { GoogleSignIn } from "@/components/google-sign-in";
import { MagicLinkSignIn } from "@/components/magic-link";
import { getI18n } from "@/locales/server";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bubba/ui/accordion";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Bubba AI",
};

export default async function Page() {
  const t = await getI18n();

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
              <h2 className="mt-4 text-lg font-medium">{t("auth.title")}</h2>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">
                  {t("auth.description")}
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
                    <span>{t("auth.options")}</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    <div className="flex flex-col space-y-4">
                      {moreSignInOptions}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <p className="text-xs text-muted-foreground">{t("auth.terms")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

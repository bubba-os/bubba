import { WaitlistForm } from "@/app/components/waitlist-form";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-mono">
            Bubba AI, Inc.
          </h1>

          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-mono">
            Compliance automation made easy.
          </h2>

          <div className="max-w-[650px]">
            <p className="leading-7 mt-6">
              We want to get 1,000,000 companies SOC 2, ISO 27001, and GDPR
              compliant by 2030. To do this, we're building the first ever open
              source compliance automation platform.
            </p>

            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Integrate with your existing systems to automatically track
              compliance progress, collect evidence, assess risks, and manage
              vendors from a single, open source platform.
            </p>

            <div className="mt-8 max-w-md flex flex-col gap-2">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight font-mono">
                Secure your spot:
              </h3>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/bubba-os/bubba"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute →
        </a>{" "}
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/pitch"
        >
          Pitch Deck →
        </Link>
      </footer>
    </div>
  );
}

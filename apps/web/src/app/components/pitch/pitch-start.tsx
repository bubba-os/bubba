import NextLink from "next/link";

export function SectionStart() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between p-4 sm:p-8">
      <div className="w-full flex justify-end">
        <span className="font-semibold font-mono text-sm sm:text-base">
          Pitch/2025
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-[clamp(2.5rem,15vw,12rem)] font-medium tracking-tight">
          <NextLink
            href="/"
            className="hover:underline hover:underline-offset-8 transition-all duration-300"
          >
            Bubba&nbsp;AI
          </NextLink>
        </h1>
      </div>

      <div className="h-8 sm:h-16" />
    </div>
  );
}

import Link from "next/link";

export function SectionStart() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center p-4 sm:p-8">
      <span className="absolute right-4 sm:right-8 top-4 font-semibold font-mono">
        Pitch/2025
      </span>
      <span className="absolute bottom-8 right-4 flex">
        <h1 className="text-[48px] sm:text-[72px] md:text-[200px] font-semibold mb-8">
          <Link href="/">
            <span className="font-medium hover:underline hover:underline-offset-8">
              Bubba&nbsp;AI
            </span>
          </Link>
        </h1>
      </span>
    </div>
  );
}

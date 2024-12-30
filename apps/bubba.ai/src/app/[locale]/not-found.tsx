import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center text-sm text-muted-foreground ">
      <h2 className="text-xl font-semibold mb-2">404 - Page not found</h2>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className="underline">
        Return to dashboard
      </Link>
    </div>
  );
}

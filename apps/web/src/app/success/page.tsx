import { Button } from "@bubba/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="grid min-h-screen place-items-center p-8">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            You're on the list! 🎉
          </h1>
          <p className="text-muted-foreground">
            Thank you for joining our waitlist. We'll notify you when we launch.
          </p>
        </div>
      </div>
    </div>
  );
}

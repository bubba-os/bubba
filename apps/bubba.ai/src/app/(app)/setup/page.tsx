import { auth } from "@/auth";
import { Onboarding } from "@/components/forms/create-organization-form";
import { Icons } from "@bubba-beta/ui/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Organization Setup | Bubba AI",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  if (session.user.onboarded && session.user.organizationId) {
    return redirect("/");
  }

  return (
    <div>
      <div className="absolute left-5 top-4 md:left-10 md:top-10">
        <Link href="/">
          <Icons.Logo />
        </Link>
      </div>

      <div className="flex min-h-screen items-center justify-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col">
          <h1 className="pb-4 text-2xl font-medium">Setup your organization</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Create your organization and add your first user.
          </p>

          <Onboarding />
        </div>
      </div>
    </div>
  );
}

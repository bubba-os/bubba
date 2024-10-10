import AdminSidenav from "@/components/ui/admin-sidebar";
import NavbarLogo from "@/components/ui/navbar-logo";
import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { getServerAuthSession } from "@/server/auth";
import { CreateOrganizationForm } from "./_components/create-organization-form";
import { UpdateProfileForm } from "./_components/update-profile-form";
import { redirect } from "next/navigation";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session && session.user.orgId === null) {
    return (
      <div className="pb-12 md:pb-0">
        <PageContainer>
          <PageContent>
            <PageTitleBar
              breadcrumb={{
                label: "Home",
                href: "/dashboard",
              }}
              title="Create Organization"
            />
            <div className="mt-8 flex items-center justify-center overflow-hidden p-6 md:p-0">
              <div className="relative z-20 m-auto flex w-full max-w-[340px] flex-col">
                <div>
                  <h1 className="mb-8 text-2xl font-medium">
                    What&apos;s the name of your company / organization?
                  </h1>
                </div>
                <div className="mb-2">
                  <p className="text-sm">
                    This will be the name of your Bubba workspace - choose
                    something that your team will recognize.
                  </p>
                </div>
                <CreateOrganizationForm />
              </div>
            </div>
          </PageContent>
        </PageContainer>
      </div>
    );
  }

  if (session && session.user.orgId !== null && session.user.name === null) {
    return (
      <div className="pb-12 md:pb-0">
        <PageContainer>
          <PageContent>
            <PageTitleBar
              breadcrumb={{
                label: "Home",
                href: "/dashboard",
              }}
              title="Create Organization"
            />
            <div className="mt-8 flex items-center justify-center overflow-hidden p-6 md:p-0">
              <div className="relative z-20 m-auto flex w-full max-w-[340px] flex-col">
                <div>
                  <h1 className="mb-8 text-2xl font-medium">
                    What should we call you?
                  </h1>
                </div>
                <div className="mb-2">
                  <p className="text-sm">
                    Enter your full name so we can personalize your Bubba
                    experience and your team can recognize you.
                  </p>
                </div>
                <UpdateProfileForm />
              </div>
            </div>
          </PageContent>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="bg-background-secondary relative w-full overflow-y-auto">
      <div className="bg-background-primary border-border-primary flex items-center justify-between border-b p-4 lg:hidden">
        <NavbarLogo />
      </div>
      <div className="flex w-full flex-col gap-0 lg:h-screen lg:flex-row">
        <div className="z-0 hidden h-full w-full lg:block lg:w-60">
          <AdminSidenav session={session} />
        </div>
        <div className="bg-background-primary lg:border-border-primary z-0 w-full overflow-y-auto lg:m-2 lg:w-[calc(100vw-224px)]">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </div>
      </div>
    </div>
  );
}

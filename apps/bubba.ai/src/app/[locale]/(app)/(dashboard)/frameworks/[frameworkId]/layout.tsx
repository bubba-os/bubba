import { SkeletonLoader } from "@/components/skeleton-loader";
import { getI18n } from "@/locales/server";
import { SecondaryMenu } from "@bubba/ui/secondary-menu";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ frameworkId: string }>;
}
export default async function Layout({ children, params }: LayoutProps) {
  const t = await getI18n();
  const frameworkId = await params;

  return (
    <div className="max-w-[1200px]">
      <Suspense fallback={<SkeletonLoader amount={2} />}>
        <SecondaryMenu
          items={[
            { path: "/", label: t("overview.title") },
            {
              path: `/frameworks/${frameworkId.frameworkId}`,
              label: t("frameworks.title"),
            },
          ]}
        />
      </Suspense>

      <main className="mt-8">{children}</main>
    </div>
  );
}

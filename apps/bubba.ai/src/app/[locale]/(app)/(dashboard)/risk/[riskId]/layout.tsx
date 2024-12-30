import { getI18n } from "@/locales/server";
import { SecondaryMenu } from "@bubba/ui/secondary-menu";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const t = await getI18n();

  return (
    <div className="max-w-[1200px]">
      <Suspense fallback={<div>Loading...</div>}>
        <SecondaryMenu
          items={[
            { path: "/risk", label: t("risk.dashboard.title") },
            { path: "/risk/register", label: t("risk.register.title") },
          ]}
        />
      </Suspense>

      <main className="mt-8">{children}</main>
    </div>
  );
}

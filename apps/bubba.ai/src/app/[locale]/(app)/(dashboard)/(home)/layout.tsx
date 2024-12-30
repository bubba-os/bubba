import { getI18n } from "@/locales/server";
import { SecondaryMenu } from "@bubba/ui/secondary-menu";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="max-w-[1200px]">
      <Suspense fallback={<div>Loading...</div>}>
        <SecondaryMenu items={[{ path: "/", label: t("overview.title") }]} />
      </Suspense>

      <main className="mt-8">{children}</main>
    </div>
  );
}

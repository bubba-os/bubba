import { SecondaryMenu } from "@bubba/ui/secondary-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px]">
      <SecondaryMenu items={[{ path: "/", label: "Overview" }]} />

      <main className="mt-8">{children}</main>
    </div>
  );
}

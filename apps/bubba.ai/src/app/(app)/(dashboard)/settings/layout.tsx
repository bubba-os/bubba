import { SecondaryMenu } from "@bubba/ui/secondary-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[800px]">
      <SecondaryMenu
        items={[
          { path: "/settings", label: "General" },
          { path: "/settings/members", label: "Members" },
          { path: "/settings/billing", label: "Billing" },
        ]}
      />

      <main className="mt-8">{children}</main>
    </div>
  );
}

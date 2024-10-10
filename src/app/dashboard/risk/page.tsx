import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { PlusIcon } from "lucide-react";
import { type Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Risk Management | Bubba",
};

export default async function RiskManagement() {
  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Risk Management",
              href: "/dashboard/risk",
            }}
            title="Risk Management"
            subtitle="View all risk management for your organization."
            actions={[
              {
                label: "New Risk",
                href: "/dashboard/risk/create",
                icon: PlusIcon,
              },
            ]}
          />
        </PageContent>
      </PageContainer>
    </div>
  );
}

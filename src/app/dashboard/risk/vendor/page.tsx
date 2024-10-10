import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { PlusIcon } from "lucide-react";
import { type Metadata } from "next";
import { Vendors } from "./new/_components";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Vendor Management | Bubba",
};

export default async function VendorManagement() {
  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Risk Management",
              href: "/dashboard/risk",
            }}
            title="Vendor Management"
            subtitle="View all vendors for your organization."
            actions={[
              {
                label: "New Vendor",
                href: "/dashboard/risk/vendor/new/",
                icon: PlusIcon,
              },
            ]}
          />
        </PageContent>
        <Card className="mt-4 rounded-lg bg-card p-1 text-card-foreground">
          <Vendors />
        </Card>
      </PageContainer>
    </div>
  );
}

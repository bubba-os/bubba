import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { Policies } from "./_components";

import { PlusIcon } from "lucide-react";
import { type Metadata } from "next";
import { Card } from "@/components/ui/card";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Policies | Bubba",
};

export default async function PoliciesPage() {
  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Policies",
              href: "/dashboard/policies",
            }}
            title="Policies"
            subtitle="View all policies for your organization."
            actions={[
              {
                label: "New Policy",
                href: "/dashboard/policies/create",
                icon: PlusIcon,
              },
            ]}
          />
        </PageContent>
        <Card className="mt-4 rounded-lg bg-card p-1 text-card-foreground">
          <Policies />
        </Card>
      </PageContainer>
    </div>
  );
}

import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";

import { type Metadata } from "next";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Create New Policy | Bubba",
};

export default async function CreatePolicy() {
  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Policies",
              href: "/dashboard/policies",
            }}
            title="Create New Policy"
            subtitle="Create a new policy for your organization."
          />
        </PageContent>
      </PageContainer>
    </div>
  );
}

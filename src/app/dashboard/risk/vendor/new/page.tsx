import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { CreateVendorForm } from "./_components/create-vendor-form";
import { type Metadata } from "next";
import { getServerAuthSession } from "@/server/auth";
import { loadUsers } from "@/lib/loadUsers";

export const metadata: Metadata = {
  title: "Create Vendor | Bubba",
};

export default async function CreateVendor() {
  const session = await getServerAuthSession();
  const users = await loadUsers(session?.user.orgId ?? "");

  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Vendor Management",
              href: "/dashboard/risk/vendor",
            }}
            title="Create New Vendor"
            subtitle="Add a new vendor to your organization."
          />
          <CreateVendorForm users={users} />
        </PageContent>
      </PageContainer>
    </div>
  );
}

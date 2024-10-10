import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { type Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Trust Vault | Bubba",
};

export default async function TrustVault() {
  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Trust Vault",
              href: "/dashboard/vault",
            }}
            title="Trust Vault"
            subtitle="Share your compliance documents securely with your customers."
          />
        </PageContent>
      </PageContainer>
    </div>
  );
}

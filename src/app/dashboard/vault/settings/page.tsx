import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { type Metadata } from "next";
import { TrustVaultSettingsForm } from "./_components/trust-vault-settings-form";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { env } from "@/env";
import { db } from "@/server/db";

export const metadata: Metadata = {
  title: "Trust Vault Settings | Bubba",
};

export default async function TrustVaultSettings() {
  const url = env.TRUST_VAULT_ROOT_URL;
  const session = await getServerAuthSession();

  if (!session?.user.orgId) {
    return redirect("/");
  }

  const [organization] = await Promise.all([
    db.organization.findUnique({
      where: {
        id: session.user.orgId,
      },
      select: {
        subdomain: true,
        published: true,
      },
    }),
  ]);

  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Trust Vault",
              href: "/dashboard/vault",
            }}
            title="Trust Vault Settings"
            subtitle="Manage your trust vault settings."
          />
          <TrustVaultSettingsForm
            url={url}
            subdomain={organization?.subdomain ?? undefined}
            published={organization?.published ?? false}
          />
        </PageContent>
      </PageContainer>
    </div>
  );
}

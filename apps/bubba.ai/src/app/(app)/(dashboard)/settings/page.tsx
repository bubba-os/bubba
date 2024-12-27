import { DeleteOrganization } from "@/components/forms/organization/delete-organization";
import { UpdateOrganizationName } from "@/components/forms/organization/update-organization-name";
import { UpdateOrganizationWebsite } from "@/components/forms/organization/update-organization-website";
import { SeedDataForm } from "@/components/forms/seed-data-form";
import { auth } from "@bubba-beta/auth";
import { db } from "@bubba-beta/db";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Organization Settings | Bubba AI",
};

export default async function OrganizationSettings() {
  const session = await auth();

  const [organization] = await Promise.all([
    db.organization.findUnique({
      where: {
        id: session?.user.organizationId,
      },
    }),
  ]);

  if (!organization) {
    return redirect("/");
  }

  return (
    <div className="space-y-12">
      <UpdateOrganizationName organizationName={organization.name} />
      <UpdateOrganizationWebsite organizationWebsite={organization.website} />
      <DeleteOrganization organizationId={organization.id} />
      {process.env.NODE_ENV === "development" && (
        <SeedDataForm organizationId={organization.id} />
      )}
    </div>
  );
}

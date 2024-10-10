"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "@/lib/safe-actions";
import { createOrganizationSchema } from "./organization-schema";
import { track } from "@vercel/analytics/server";
import { type PolicyType, PolicyStatus } from "@prisma/client";
import { db } from "@/server/db";

const policies: PolicyType[] = [
  "SECURITY_POLICY",
  "PRIVACY_POLICY",
  "DATA_RETENTION_POLICY",
];

export const createOrganizationAction = authActionClient
  .schema(createOrganizationSchema)
  .metadata({
    name: "create-organization",
    track: {
      event: "create_organization",
      channel: "web",
    },
  })
  .action(
    async ({ parsedInput: { name: name, redirectTo: redirectTo }, ctx }) => {
      const user = ctx.user.user.id;

      if (!user) {
        return {
          error: "Unauthorized",
        };
      }

      const organization = await db.organization.create({
        data: {
          name,
          memberships: {
            create: {
              userId: user,
              role: "OWNER",
            },
          },
        },
      });

      await track("organization_created", {
        organizationId: organization.id,
      });

      await db.policy.createMany({
        data: policies.map((policyType) => ({
          organizationId: organization.id,
          title: formatPolicyTitle(policyType),
          policyType: policyType,
          status: PolicyStatus.DRAFT,
          assignedToId: user,
        })),
      });

      revalidateTag("dashboard");

      if (redirectTo) {
        redirect(redirectTo);
      }

      return {
        organizationId: organization.id,
      };
    },
  );

function formatPolicyTitle(policyType: string): string {
  return policyType
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

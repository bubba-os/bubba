"use server";

import { db } from "@bubba-beta/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { organizationWebsiteSchema } from "../schema";

type UpdateOrganizationWebsiteResult = {
  success: boolean;
};

export const updateOrganizationWebsiteAction = authActionClient
  .schema(organizationWebsiteSchema)
  .metadata({
    name: "update-organization-website",
    track: {
      event: "update-organization-website",
      channel: "server",
    },
  })
  .action(
    async ({ parsedInput, ctx }): Promise<UpdateOrganizationWebsiteResult> => {
      const { website } = parsedInput;
      const { organizationId } = ctx.user;

      if (!website) {
        throw new Error("Invalid user input");
      }

      try {
        await db.$transaction(async (prisma) => {
          await prisma.organization.update({
            where: { id: organizationId },
            data: { website },
          });
        });

        revalidatePath("/settings");
        revalidateTag(`organization_${organizationId}`);

        return {
          success: true,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update organization website");
      }
    },
  );

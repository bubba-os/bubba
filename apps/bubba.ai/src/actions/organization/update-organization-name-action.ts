// update-organization-name-action.ts

"use server";

import { db } from "@bubba-beta/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { organizationNameSchema } from "../schema";

type UpdateOrganizationNameResult = {
  success: boolean;
};

export const updateOrganizationNameAction = authActionClient
  .schema(organizationNameSchema)
  .metadata({
    name: "update-organization-name",
    track: {
      event: "update-organization-name",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { name } = parsedInput;
    const { organizationId } = ctx.user;

    if (!name) {
      throw new Error("Invalid user input");
    }

    try {
      await db.$transaction(async () => {
        await db.organization.update({
          where: { id: organizationId },
          data: { name },
        });
      });

      revalidatePath("/settings");
      revalidateTag(`organization_${organizationId}`);

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update organization name");
    }
  });

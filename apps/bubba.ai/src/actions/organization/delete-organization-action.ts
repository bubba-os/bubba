// delete-organization-action.ts

"use server";

import { db } from "@bubba/db";
import { authActionClient } from "../safe-action";
import { deleteOrganizationSchema } from "../schema";

type DeleteOrganizationResult = {
  success: boolean;
  redirect?: string;
};

export const deleteOrganizationAction = authActionClient
  .schema(deleteOrganizationSchema)
  .metadata({
    name: "delete-organization",
    track: {
      event: "delete-organization",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }): Promise<DeleteOrganizationResult> => {
    const { id } = parsedInput;
    const { user } = ctx;

    if (!id) {
      throw new Error("Invalid user input");
    }

    if (!user.organizationId) {
      throw new Error("Invalid organization input");
    }

    try {
      await db.$transaction(async () => {
        await db.organization.delete({
          where: { id: user.organizationId },
        });
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  });

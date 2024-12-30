"use server";

import { db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { updateInherentRiskSchema } from "../schema";

export const updateInherentRiskAction = authActionClient
  .schema(updateInherentRiskSchema)
  .metadata({
    name: "update-inherent-risk",
    track: {
      event: "update-inherent-risk",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { id, probability, impact } = parsedInput;
    const { user } = ctx;

    if (!user.organizationId) {
      throw new Error("Invalid organization");
    }

    try {
      await db.risk.update({
        where: {
          id,
          organizationId: user.organizationId,
        },
        data: {
          probability,
          impact,
        },
      });

      revalidatePath("/risk");
      revalidatePath("/risk/register");
      revalidatePath(`/risk/${id}`);
      revalidateTag("risks");

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating inherent risk:", error);
      return {
        success: false,
      };
    }
  });

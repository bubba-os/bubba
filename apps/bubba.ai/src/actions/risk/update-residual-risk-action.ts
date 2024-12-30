"use server";

import { db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { updateResidualRiskSchema } from "../schema";

export const updateResidualRiskAction = authActionClient
  .schema(updateResidualRiskSchema)
  .metadata({
    name: "update-residual-risk",
    track: {
      event: "update-residual-risk",
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
          residual_probability: probability,
          residual_impact: impact,
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
      console.error("Error updating residual risk:", error);
      return {
        success: false,
      };
    }
  });

// update-risk-action.ts

"use server";

import { type Departments, type RiskCategory, db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { updateRiskSchema } from "../schema";

export const updateRiskAction = authActionClient
  .schema(updateRiskSchema)
  .metadata({
    name: "update-risk",
    track: {
      event: "update-risk",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { id, category, department, ownerId } = parsedInput;
    const { user } = ctx;

    console.log(category, department, ownerId);

    if (!user.id || !user.organizationId) {
      throw new Error("Invalid user input");
    }

    try {
      const updatedRisk = await db.risk.update({
        where: {
          id,
          organizationId: user.organizationId,
        },
        data: {
          ownerId: ownerId,
          category: category,
          department: department,
        },
      });

      console.log(updatedRisk);

      revalidatePath(`/risk/register/${id}`);
      revalidateTag("risks");

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating risk:", error);

      return {
        success: false,
      };
    }
  });

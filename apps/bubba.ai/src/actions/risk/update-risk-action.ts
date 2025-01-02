// update-risk-action.ts

"use server";

import { db } from "@bubba/db";
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
    const { id, title, description, category, department, ownerId, status } =
      parsedInput;
    const { user } = ctx;

    if (!user.id || !user.organizationId) {
      throw new Error("Invalid user input");
    }

    try {
      await db.risk.update({
        where: {
          id,
          organizationId: user.organizationId,
        },
        data: {
          title: title,
          description: description,
          ownerId: ownerId,
          category: category,
          department: department,
          status: status,
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
      console.error("Error updating risk:", error);

      return {
        success: false,
      };
    }
  });

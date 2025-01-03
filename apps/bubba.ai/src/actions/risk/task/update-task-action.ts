// update-task-action.ts

"use server";

import { type RiskTaskStatus, db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../../safe-action";
import { updateTaskSchema } from "../../schema";

export const updateTaskAction = authActionClient
  .schema(updateTaskSchema)
  .metadata({
    name: "update-task",
    track: {
      event: "update-task",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { id, dueDate, status, ownerId, title, description } = parsedInput;
    const { user } = ctx;

    if (!user.id || !user.organizationId) {
      throw new Error("Invalid user input");
    }

    try {
      const riskId = await db.riskMitigationTask.findUnique({
        where: {
          id: id,
        },
        select: {
          riskId: true,
        },
      });

      if (!riskId) {
        throw new Error("Risk not found");
      }

      await db.riskMitigationTask.update({
        where: {
          id: id,
          organizationId: user.organizationId,
        },
        data: {
          dueDate: dueDate,
          status: status as RiskTaskStatus,
          ownerId: ownerId,
          title: title,
          description: description,
        },
      });

      revalidatePath("/risk");
      revalidatePath(`/risk/${riskId.riskId}`);
      revalidatePath(`/risk/${riskId.riskId}/tasks/${id}`);
      revalidateTag("risks");

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  });

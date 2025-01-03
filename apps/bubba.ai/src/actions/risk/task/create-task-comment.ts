// create-task-comment.ts

"use server";

import { db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../../safe-action";
import { createTaskCommentSchema } from "../../schema";

export const createTaskCommentAction = authActionClient
  .schema(createTaskCommentSchema)
  .metadata({
    name: "create-task-comment",
    track: {
      event: "create-task-comment",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { riskId, taskId, content } = parsedInput;
    const { user } = ctx;

    if (!user.id || !user.organizationId) {
      throw new Error("Invalid user input");
    }

    await db.taskComments.create({
      data: {
        riskId,
        riskMitigationTaskId: taskId,
        content,
        ownerId: user.id,
        organizationId: user.organizationId,
      },
    });

    revalidatePath(`/risk/${riskId}`);
    revalidatePath(`/risk/${riskId}/tasks/${taskId}`);
    revalidateTag(`risk_${user.organizationId}`);

    return { success: true };
  });

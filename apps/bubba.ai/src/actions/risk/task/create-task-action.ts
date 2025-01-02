// create-task-action.ts

"use server";

import { db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../../safe-action";
import { createTaskSchema } from "../../schema";

export const createTaskAction = authActionClient
  .schema(createTaskSchema)
  .metadata({
    name: "create-task",
    track: {
      event: "create-task",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { riskId, title, description, dueDate, ownerId } = parsedInput;
    const { user } = ctx;

    if (!user.id || !user.organizationId) {
      throw new Error("Invalid user input");
    }

    try {
      await db.riskMitigationTask.create({
        data: {
          riskId,
          title,
          description,
          dueDate,
          ownerId,
          organizationId: user.organizationId,
        },
      });

      revalidatePath(`/risk/${riskId}`);
      revalidateTag(`risk_${user.organizationId}`);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  });

// create-risk-comment.ts

"use server";

import { db } from "@bubba/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { createRiskCommentSchema } from "../schema";

export const createRiskCommentAction = authActionClient
  .schema(createRiskCommentSchema)
  .metadata({
    name: "create-risk-comment",
    track: {
      event: "create-risk-comment",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { riskId, content } = parsedInput;
    const { user } = ctx;

    if (!user.id || !user.organizationId) {
      throw new Error("Invalid user input");
    }

    await db.riskComment.create({
      data: {
        riskId,
        content,
        ownerId: user.id,
        organizationId: user.organizationId,
      },
    });

    revalidatePath(`/risk/${riskId}`);
    revalidateTag(`risk_${user.organizationId}`);

    return { success: true };
  });

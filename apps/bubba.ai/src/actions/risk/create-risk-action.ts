// create-risk-action.ts

"use server";

import { db } from "@bubba-beta/db";
import { RiskImpact, RiskProbability } from "@bubba-beta/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { authActionClient } from "../safe-action";
import { createRiskSchema } from "../schema";

export const createRiskAction = authActionClient
  .schema(createRiskSchema)
  .metadata({
    name: "create-risk",
    track: {
      event: "create-risk",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }) => {
    const { title, description, category, department } = parsedInput;
    const { user } = ctx;

    if (!user.id || !user.organizationId) {
      throw new Error("Invalid user input");
    }

    try {
      await db.risk.create({
        data: {
          title,
          description,
          category,
          department,
          probability: RiskProbability.low,
          impact: RiskImpact.low,
          ownerId: user.id,
          organizationId: user.organizationId,
        },
      });

      revalidatePath("/risk");
      revalidatePath("/risk/register");
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

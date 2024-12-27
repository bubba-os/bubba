"use server";

import { db } from "@bubba-beta/db";
import { authActionClient } from "../safe-action";

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

export const getOrganizationUsersAction = authActionClient
  .metadata({
    name: "get-organization-users",
  })
  .action(
    async ({
      parsedInput,
      ctx,
    }): Promise<{ success: boolean; error?: string; data?: User[] }> => {
      if (!ctx.user.organizationId) {
        return {
          success: false,
          error: "User does not have an organization",
        };
      }

      try {
        const users = await db.user.findMany({
          where: {
            organizationId: ctx.user.organizationId,
          },
          select: {
            id: true,
            name: true,
            image: true,
          },
          orderBy: {
            name: "asc",
          },
        });

        return {
          success: true,
          data: users.map((user: User) => ({
            id: user.id,
            name: user.name || "",
            image: user.image || "",
          })),
        };
      } catch (error) {
        return {
          success: false,
          error: "Failed to fetch organization users",
        };
      }
    },
  );

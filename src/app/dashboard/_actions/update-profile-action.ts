"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient } from "@/lib/safe-actions";
import { createProfileSchema } from "./profile-schema";
import { db } from "@/server/db";

export const updateProfileAction = authActionClient
  .schema(createProfileSchema)
  .metadata({
    name: "update-profile",
    track: {
      event: "update_profile",
      channel: "web",
    },
  })
  .action(
    async ({ parsedInput: { name: name, redirectTo: redirectTo }, ctx }) => {
      const user = ctx.user.user.id;

      if (!user) {
        return {
          error: "Unauthorized",
        };
      }

      try {
        await db.user.update({
          where: {
            id: user,
          },
          data: {
            name,
          },
        });
      } catch (error) {
        console.error(error);
        return {
          error: "Failed to update profile",
        };
      }

      revalidateTag("dashboard");

      if (redirectTo) {
        redirect(redirectTo);
      }

      return {
        success: true,
      };
    },
  );

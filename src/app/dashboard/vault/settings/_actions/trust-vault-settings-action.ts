// trust-vault-settings-action.ts

"use server";

import { authActionClient } from "@/lib/safe-actions";
import { trustVaultSettingsSchema } from "./trust-vault-settings-schema";
import { revalidateTag } from "next/cache";
import { db } from "@/server/db";
import { addVaultDomain } from "@/lib/vault";
import { env } from "@/env";

export const trustVaultSettingsAction = authActionClient
  .schema(trustVaultSettingsSchema)
  .metadata({
    name: "trust-vault-settings",
    track: {
      event: "trust_vault_settings_updated",
      channel: "web",
    },
  })
  .action(async ({ parsedInput: { subdomain }, ctx }) => {
    const userId = ctx.user.user.id;

    if (!userId || !ctx.user.user.orgId) {
      return {
        error: "Unauthorized",
      };
    }

    try {
      const current_subdomain = await db.organization.findUnique({
        where: {
          id: ctx.user.user.orgId,
        },
        select: {
          subdomain: true,
        },
      });

      if (current_subdomain?.subdomain != subdomain) {
        const vault_subdomain = await db.organization.update({
          data: {
            subdomain: subdomain,
          },
          where: {
            id: ctx.user.user.orgId,
          },
        });

        if (vault_subdomain) {
          await Promise.all([
            await addVaultDomain(`${subdomain}.${env.TRUST_VAULT_ROOT_URL}`),
            await addVaultDomain(
              `www.${subdomain}.${env.TRUST_VAULT_ROOT_URL}`,
            ),
          ]);
        } else {
          return {
            error: "Invalid subdomain",
          };
        }
      }
    } catch (error) {
      throw error;
    }

    revalidateTag("vault-settings");

    return {
      success: true,
    };
  });

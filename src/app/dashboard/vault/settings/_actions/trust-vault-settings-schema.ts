import { z } from "zod";

export const trustVaultSettingsSchema = z.object({
  subdomain: z
    .string()
    .min(2, {
      message: "Subdomain must be at least 2 characters.",
    })
    .max(32, {
      message: "Subdomain must be at most 32 characters.",
    })
    .regex(/^[a-zA-Z0-9\-]+$/, {
      message:
        "Subdomain must only contain lowercase letters, numbers, and dashes.",
    })
    .toLowerCase(),
  redirectTo: z.string().optional(),
});

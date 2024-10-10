import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  redirectTo: z.string().optional(),
});

import { z } from "zod";

export const createProfileSchema = z.object({
  name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  redirectTo: z.string().optional(),
});

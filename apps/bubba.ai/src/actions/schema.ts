import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().min(1).max(255),
  website: z.string().url().max(255),
});

export const organizationNameSchema = z.object({
  name: z.string().min(1).max(255),
});

export const deleteOrganizationSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
});

export const sendFeedbackSchema = z.object({
  feedback: z.string(),
});

export const updaterMenuSchema = z.array(
  z.object({
    path: z.string(),
    name: z.string(),
  }),
);

export const organizationWebsiteSchema = z.object({
  website: z.string().url().max(255),
});

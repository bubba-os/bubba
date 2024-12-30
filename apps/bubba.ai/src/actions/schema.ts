import {
  Departments,
  RiskCategory,
  RiskImpact,
  RiskProbability,
  RiskStatus,
} from "@bubba/db";
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

// Risks
export const createRiskSchema = z.object({
  title: z
    .string({
      required_error: "Risk name is required",
    })
    .min(1, {
      message: "Risk name should be at least 1 character",
    })
    .max(100, {
      message: "Risk name should be at most 100 characters",
    }),
  description: z
    .string({
      required_error: "Risk description is required",
    })
    .min(1, {
      message: "Risk description should be at least 1 character",
    })
    .max(255, {
      message: "Risk description should be at most 255 characters",
    }),
  category: z.nativeEnum(RiskCategory, {
    required_error: "Risk category is required",
  }),
  department: z.nativeEnum(Departments, {
    required_error: "Risk department is required",
  }),
  ownerId: z.string({
    required_error: "You must assign an owner to the risk",
  }),
});

export const updateRiskSchema = createRiskSchema.extend({
  id: z.string(),
  category: z.nativeEnum(RiskCategory),
  department: z.nativeEnum(Departments),
  ownerId: z.string(),
});

// Seed Data
export const seedDataSchema = z.object({
  organizationId: z.string(),
});

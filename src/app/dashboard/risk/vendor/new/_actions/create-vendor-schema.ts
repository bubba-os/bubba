import { z } from "zod";
import { VendorRisk, VendorCategory } from "@prisma/client";

export const createVendorSchema = z.object({
  name: z
    .string({
      required_error: "Vendor name is required.",
    })
    .min(2, {
      message: "Vendor name is too short.",
    }),
  url: z
    .string({
      required_error: "URL is required.",
    })
    .url({
      message: "URL is invalid.",
    }),
  category: z.nativeEnum(VendorCategory, {
    errorMap: () => ({ message: "Category is required." }),
  }),
  assignedTo: z
    .string({
      required_error: "User is required.",
    })
    .min(2, {
      message: "User ID is not valid.",
    }),
  inherentRisk: z.nativeEnum(VendorRisk, {
    errorMap: () => ({ message: "Risk level is required." }),
  }),
  contacts: z.array(
    z.object({
      name: z
        .string({
          required_error: "Name is required.",
        })
        .min(2, {
          message: "Name must be at least 2 characters.",
        }),
      email: z
        .string({
          required_error: "Email is required.",
        })
        .email({
          message: "Email address is not valid.",
        }),
    }),
  ),
  redirectTo: z.string().optional(),
});

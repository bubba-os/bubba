"use server";

import { redirect } from "next/navigation";
import { authActionClient } from "@/lib/safe-actions";
import { createVendorSchema } from "./create-vendor-schema";
import { db } from "@/server/db";
import {
  type VendorContact,
  type VendorCategory,
  type VendorRisk,
  type VendorStatus,
} from "@prisma/client";

export type Vendor = {
  name: string;
  url: string;
  category: VendorCategory;
  organizationId: string;
  assignedToId: string;
  risk: VendorRisk;
  status: VendorStatus;
  contacts: VendorContact[] | undefined;
};

export const createVendorAction = authActionClient
  .schema(createVendorSchema)
  .metadata({
    name: "create_vendor",
    track: {
      event: "create_vendor",
      channel: "web",
    },
  })
  .action(
    async ({
      parsedInput: { name, url, category, inherentRisk, redirectTo, contacts },
      ctx,
    }) => {
      const user = ctx.user.user.id;
      const orgId = ctx.user.user.orgId;

      if (!user || !orgId) {
        return {
          error: "Unauthorized",
        };
      }

      const vendor = await db.vendor.create({
        data: {
          name: name,
          url: url,
          category: category,
          organizationId: orgId,
          assignedToId: user,
          risk: inherentRisk,
          status: "NOT_STARTED",
          contacts: {
            create: contacts.map((contact) => ({
              name: contact.name,
              email: contact.email,
            })),
          },
        },
      });

      if (redirectTo) {
        redirect(redirectTo);
      }

      return {
        message: "Vendor created successfully",
      };
    },
  );

import { db } from "@bubba-beta/db";
import { stripe } from "./stripe.js";

async function createStripeCustomer(input: {
  name: string;
  email: string;
  organizationId: string;
}): Promise<string> {
  try {
    const customer = await stripe.customers.create({
      name: input.name,
      email: input.email,
      metadata: {
        organizationId: input.organizationId,
      },
    });

    return customer.id;
  } catch (error) {
    console.error("Error creating Stripe customer", error);
    throw error;
  }
}

export async function createOrganizationAndConnectUser(input: {
  userId: string;
  normalizedEmail: string;
}): Promise<string> {
  const initialName = "New Organization";

  const [organization] = await db.$transaction([
    db.organization.create({
      data: {
        name: initialName,
        tier: "FREE",
        website: "",
        users: {
          connect: {
            id: input.userId,
          },
        },
      },
      select: {
        id: true,
      },
    }),
    db.user.update({
      where: { id: input.userId },
      data: { role: "ADMIN" },
      select: {
        id: true,
      },
    }),
  ]);

  const stripeCustomerId = await createStripeCustomer({
    name: initialName,
    email: input.normalizedEmail,
    organizationId: organization.id,
  });

  if (!stripeCustomerId) {
    console.warn("Stripe customer ID is missing");
  }

  await db.organization.update({
    where: { id: organization.id },
    data: { stripeCustomerId },
  });

  return organization.id;
}

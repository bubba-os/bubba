import { soc2Seed } from "@/actions/soc2-seed";
import { db } from "@bubba/db";
import { stripe } from "./stripe";

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
        tier: "free",
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
      data: { role: "admin" },
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

  await soc2Seed({
    organizationId: organization.id,
    userId: input.userId,
  });

  return organization.id;
}

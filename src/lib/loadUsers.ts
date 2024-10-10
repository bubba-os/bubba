import { db } from "@/server/db";

export async function loadUsers(orgId: string | undefined) {
  if (!orgId) return [];

  const users = await db.user.findMany({
    where: {
      organizationMemberships: {
        some: {
          organizationId: orgId,
        },
      },
    },
  });

  return users;
}

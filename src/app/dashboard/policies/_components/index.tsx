import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { DataTable } from "./policy-table";

export async function Policies() {
  const session = await getServerAuthSession();

  if (!session?.user.orgId) {
    return [];
  }

  const [policies] = await Promise.all([
    db.policy.findMany({
      where: {
        organizationId: session.user.orgId,
      },
      include: {
        assignedTo: true,
      },
    }),
  ]);

  return <DataTable data={policies} />;
}

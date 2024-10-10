import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { DataTable } from "./vendor-table";

export async function Vendors() {
  const session = await getServerAuthSession();

  if (!session?.user.orgId) {
    return [];
  }

  const [vendors] = await Promise.all([
    db.vendor.findMany({
      where: {
        organizationId: session.user.orgId,
      },
      select: {
        id: true,
        name: true,
        category: true,
        risk: true,
        url: true,
        assignedToId: true,
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
        organizationId: true,
        createdAt: true,
        updatedAt: true,
        status: true,
      },
    }),
  ]);

  return <DataTable data={vendors} />;
}

import { db } from "@bubba/db";
import { StatusChart } from "./status-chart";

interface Props {
  organizationId: string;
}

export async function RisksByStatus({ organizationId }: Props) {
  const risks = await getRisksByStatus(organizationId);

  const data = risks.map((risk) => ({
    name: risk.status,
    value: risk._count,
  }));

  return <StatusChart data={data} />;
}

async function getRisksByStatus(organizationId: string) {
  return await db.risk.groupBy({
    by: ["status"],
    where: { organizationId },
    _count: true,
  });
}

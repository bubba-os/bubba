import { db } from "@bubba/db";
import { StatusChart } from "./status-chart";

interface Props {
  organizationId: string;
}

export async function RisksByStatus({ organizationId }: Props) {
  const risks = await db.risk.groupBy({
    by: ["status"],
    where: { organizationId },
    _count: true,
  });

  const data = risks.map((risk) => ({
    name: risk.status,
    value: risk._count,
  }));

  return <StatusChart data={data} />;
}

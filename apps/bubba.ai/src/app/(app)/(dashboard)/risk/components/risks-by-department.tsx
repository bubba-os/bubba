import { db } from "@bubba-beta/db";
import { ChartContainer } from "@bubba-beta/ui/chart";
import { DepartmentChart } from "./department-chart";

interface Props {
  organizationId: string;
}

export async function RisksByDepartment({ organizationId }: Props) {
  const risks = await db.risk.groupBy({
    by: ["department"],
    where: { organizationId },
    _count: true,
  });

  const data = risks.map((risk) => ({
    name: risk.department || "None",
    value: risk._count,
  }));

  return <DepartmentChart data={data} />;
}

import { db } from "@bubba/db";
import { ChartContainer } from "@bubba/ui/chart";
import { DepartmentChart } from "./department-chart";

interface Props {
  organizationId: string;
}

export async function RisksByDepartment({ organizationId }: Props) {
  const risks = await getRisksByDepartment(organizationId);

  const data = risks.map((risk) => ({
    name: risk.department || "None",
    value: risk._count,
  }));

  return <DepartmentChart data={data} />;
}

async function getRisksByDepartment(organizationId: string) {
  "use cache";

  return await db.risk.groupBy({
    by: ["department"],
    where: { organizationId },
    _count: true,
  });
}

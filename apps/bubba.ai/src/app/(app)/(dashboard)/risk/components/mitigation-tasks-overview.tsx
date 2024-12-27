import { db } from "@bubba/db";
import { MitigationTasksChart } from "./mitigation-tasks-chart";

interface Props {
  organizationId: string;
}

export async function MitigationTasksOverview({ organizationId }: Props) {
  const tasks = await db.riskMitigationTask.findMany({
    where: {
      risk: {
        organizationId,
      },
    },
    select: {
      completedAt: true,
      dueDate: true,
    },
  });

  const now = new Date();

  const data = [
    {
      name: "Completed",
      value: tasks.filter((task) => task.completedAt).length,
    },
    {
      name: "Pending",
      value: tasks.filter(
        (task) => !task.completedAt && (!task.dueDate || task.dueDate > now),
      ).length,
    },
    {
      name: "Overdue",
      value: tasks.filter(
        (task) => !task.completedAt && task.dueDate && task.dueDate < now,
      ).length,
    },
  ];

  return <MitigationTasksChart data={data} />;
}

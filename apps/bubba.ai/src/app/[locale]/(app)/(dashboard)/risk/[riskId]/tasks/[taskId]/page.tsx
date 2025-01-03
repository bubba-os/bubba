import { auth } from "@/auth";
import { TaskAttachments } from "@/components/risks/tasks/task-attachment";
import { TaskComment } from "@/components/risks/tasks/task-comments";
import { TaskOverview } from "@/components/risks/tasks/task-overview";

import { db } from "@bubba/db";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ riskId: string; taskId: string }>;
}

export default async function RiskPage({ params }: PageProps) {
  const session = await auth();
  const { riskId, taskId } = await params;

  if (!session) {
    redirect("/login");
  }

  if (!session.user.organizationId || !riskId) {
    redirect("/");
  }

  const task = await getTask(riskId, taskId);

  if (!task) {
    redirect("/risk");
  }

  const users = await getUsers(session.user.organizationId);

  return (
    <div className="flex flex-col gap-4">
      <TaskOverview task={task} users={users} />
      <TaskAttachments task={task} users={users} />
      <TaskComment task={task} users={users} />
    </div>
  );
}

const getTask = unstable_cache(
  async (riskId: string, taskId: string) => {
    const task = await db.riskMitigationTask.findUnique({
      where: {
        riskId: riskId,
        id: taskId,
      },
      include: {
        owner: true,
        TaskAttachment: true,
        TaskComments: true,
      },
    });

    return task;
  },
  ["risk-cache"],
);

const getUsers = unstable_cache(
  async (organizationId: string) => {
    const users = await db.user.findMany({
      where: { organizationId: organizationId },
    });

    return users;
  },
  ["users-cache"],
);

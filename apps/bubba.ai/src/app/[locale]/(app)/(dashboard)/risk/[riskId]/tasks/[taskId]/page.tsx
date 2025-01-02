import { auth } from "@/auth";
import { RiskOverview } from "@/components/risks/risk-overview";
import { TaskOverview } from "@/components/risks/tasks/task-overview";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { db } from "@bubba/db";
import { SecondaryMenu } from "@bubba/ui/secondary-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bubba/ui/tabs";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
      <Suspense fallback={<SkeletonLoader amount={4} />}>
        <TaskOverview task={task} users={users} />
      </Suspense>
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

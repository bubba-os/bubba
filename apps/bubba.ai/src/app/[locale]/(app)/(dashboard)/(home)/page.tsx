import { auth } from "@/auth";
import { FrameworkProgress } from "@/components/charts/framework-progress";
import { RequirementStatus } from "@/components/charts/requirement-status";

import { SkeletonLoader } from "@/components/skeleton-loader";

import { db } from "@bubba/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getComplianceOverview(organizationId: string) {
  const frameworks = await db.organizationFramework.findMany({
    where: { organizationId },
    include: {
      organizationControl: true,
      framework: true,
    },
  });

  return { frameworks };
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const { frameworks } = await getComplianceOverview(
    session.user.organizationId,
  );

  return (
    <Suspense fallback={<SkeletonLoader amount={2} />}>
      <div className="space-y-12">
        <div className="grid gap-4 md:grid-cols-2">
          <FrameworkProgress frameworks={frameworks} />
          <RequirementStatus frameworks={frameworks} />
        </div>
      </div>
    </Suspense>
  );
}

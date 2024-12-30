import { auth } from "@/auth";
import { FrameworkProgress } from "@/components/charts/framework-progress";
import { RequirementStatus } from "@/components/charts/requirement-status";
import { db } from "@bubba/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getComplianceOverview(organizationId: string) {
  const frameworks = await db.organizationFramework.findMany({
    where: { organizationId },
    include: {
      framework: true,
      organizationRequirements: {
        include: {
          requirement: true,
        },
      },
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-12">
        <div className="grid gap-4 md:grid-cols-2">
          {frameworks && <FrameworkProgress frameworks={frameworks} />}
          {frameworks && <RequirementStatus frameworks={frameworks} />}
        </div>
      </div>
    </Suspense>
  );
}

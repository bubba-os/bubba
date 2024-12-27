import { auth } from "@/auth";
import { db } from "@bubba-beta/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FrameworkProgress } from "./components/framework-progress";
import { RequirementStatus } from "./components/requirement-status";
import { UpcomingAssessments } from "./components/upcoming-assessments";

async function getComplianceOverview(organizationId: string) {
  return await db.$transaction(async (tx) => {
    const frameworks = await tx.organizationFramework.findMany({
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

    const assessments = await tx.assessment.findMany({
      where: {
        organizationId,
        endDate: { gte: new Date() },
      },
      include: {
        framework: true,
      },
      orderBy: { endDate: "asc" },
      take: 3,
    });

    return { frameworks, assessments };
  });
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const { frameworks, assessments } = await getComplianceOverview(
    session.user.organizationId,
  );

  return (
    <div className="space-y-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <FrameworkProgress frameworks={frameworks} />
          <RequirementStatus frameworks={frameworks} />
          <UpcomingAssessments assessments={assessments} />
        </Suspense>
      </div>
    </div>
  );
}

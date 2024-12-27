import { auth } from "@/auth";
import { db } from "@bubba/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FrameworkProgress } from "./components/framework-progress";
import { RequirementStatus } from "./components/requirement-status";

async function getComplianceOverview(organizationId: string) {
  "use cache";

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
    <div className="space-y-12">
      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<div>Loading...</div>}>
          {frameworks && <FrameworkProgress frameworks={frameworks} />}
          {frameworks && <RequirementStatus frameworks={frameworks} />}
        </Suspense>
      </div>
    </div>
  );
}

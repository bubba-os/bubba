import { auth } from "@/auth";
import { db } from "@bubba-beta/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RiskOverview } from "./components/risk-overview";
import { RisksByAssignee } from "./components/risks-by-assignee";

export default async function RiskManagement() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const overview = await getRiskOverview(session.user.organizationId);

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RiskOverview
          data={overview}
          organizationId={session.user.organizationId}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <RisksByAssignee organizationId={session.user.organizationId} />
      </div>
    </div>
  );
}

async function getRiskOverview(organizationId: string) {
  "use cache";

  return await db.$transaction(async (tx) => {
    const [
      risks,
      highRisks,
      openRisks,
      pendingRisks,
      closedRisks,
      archivedRisks,
    ] = await Promise.all([
      tx.risk.count({
        where: { organizationId },
      }),

      tx.risk.count({
        where: {
          organizationId,
          AND: [
            {
              OR: [{ probability: "very_high" }, { probability: "high" }],
            },
            {
              OR: [{ impact: "very_high" }, { impact: "high" }],
            },
          ],
        },
      }),

      tx.risk.count({
        where: {
          organizationId,
          status: "closed",
        },
      }),

      tx.risk.count({
        where: {
          organizationId,
          status: "pending",
        },
      }),

      tx.risk.count({
        where: {
          organizationId,
          status: "open",
        },
      }),

      tx.risk.count({
        where: {
          organizationId,
          status: "archived",
        },
      }),
    ]);

    return {
      risks,
      highRisks,
      openRisks,
      pendingRisks,
      closedRisks,
      archivedRisks,
    };
  });
}

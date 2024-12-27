import { Suspense } from "react";
import { RisksByDepartment } from "./risks-by-department";
import { RisksByStatus } from "./risks-by-status";

interface RiskOverviewProps {
  data: {
    risks: number;
    highRisks: number;
    openRisks: number;
    pendingRisks: number;
    closedRisks: number;
    archivedRisks: number;
  };
  organizationId: string;
}

export function RiskOverview({ data, organizationId }: RiskOverviewProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RisksByStatus organizationId={organizationId} />
      <RisksByDepartment organizationId={organizationId} />
    </Suspense>
  );
}

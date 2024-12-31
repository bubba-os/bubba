"use client";

import { useI18n } from "@/locales/client";
import type { Risk, User } from "@bubba/db";
import { Alert, AlertDescription, AlertTitle } from "@bubba/ui/alert";
import { Button } from "@bubba/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bubba/ui/card";
import { PencilIcon, ShieldAlert } from "lucide-react";
import { useQueryState } from "nuqs";
import { UpdateRiskOverview } from "../forms/risks/risk-overview";
import { RiskOverviewSheet } from "../sheets/risk-overview-sheet";
import { InherentRiskChart } from "./charts/inherent-risk-chart";
import { ResidualRiskChart } from "./charts/residual-risk-chart";

export function RiskOverview({
  risk,
  users,
}: {
  risk: Risk & { owner: User | null };
  users: User[];
}) {
  const t = useI18n();
  const [open, setOpen] = useQueryState("risk-overview-sheet");

  return (
    <div className="space-y-4">
      <Alert>
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>
          <div className="flex items-center justify-between gap-2">
            {risk.title}
            <Button
              size="icon"
              variant="ghost"
              className="p-0 m-0 size-auto"
              onClick={() => setOpen("true")}
            >
              <PencilIcon className="h-3 w-3" />
            </Button>
          </div>
        </AlertTitle>
        <AlertDescription className="mt-4">{risk.description}</AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between gap-2">
              Overview
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateRiskOverview risk={risk} users={users} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InherentRiskChart risk={risk} />
        <ResidualRiskChart risk={risk} />
      </div>

      <RiskOverviewSheet risk={risk} />
    </div>
  );
}

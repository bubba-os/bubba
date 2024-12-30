"use client";

import { InherentRiskSheet } from "@/components/sheets/inherent-risk";
import { useI18n } from "@/locales/client";
import type { Risk } from "@bubba/db";
import { Button } from "@bubba/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bubba/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@bubba/ui/chart";
import { PencilIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

interface InherentRiskChartProps {
  risk: Risk;
}

export function InherentRiskChart({ risk }: InherentRiskChartProps) {
  const t = useI18n();
  const [open, setOpen] = useQueryState("inherent-risk-sheet");

  const probabilityScore = risk.probability * 10;
  const impactScore = risk.impact * 10;
  const inherentRisk = (probabilityScore * impactScore) / 100;

  const data = [
    {
      metric: t("risk.metrics.probability"),
      value: probabilityScore,
      fullMark: 100,
    },
    {
      metric: t("risk.metrics.impact"),
      value: impactScore,
      fullMark: 100,
    },
    {
      metric: t("risk.metrics.inherentRisk"),
      value: inherentRisk,
      fullMark: 100,
    },
  ];

  const chartConfig = {
    risk: {
      label: t("risk.chart.inherentRisk"),
      theme: {
        light: "#ef4444",
        dark: "#dc2626",
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>
              <div className="flex items-center justify-between gap-2">
                {t("risk.metrics.inherentRisk")}
                <Button
                  onClick={() => setOpen("true")}
                  size="icon"
                  variant="ghost"
                  className="p-0 m-0 size-auto"
                >
                  <PencilIcon className="h-3 w-3" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="text-xs">
              {t("risk.dashboard.inherent_risk_description")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RadarChart data={data}>
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "currentColor", fontSize: 12 }}
            />
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={{ fill: "currentColor", fontSize: 12 }}
            />
            <Radar
              name="risk"
              dataKey="value"
              stroke="var(--color-risk)"
              fill="var(--color-risk)"
              fillOpacity={0.5}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
          </RadarChart>
        </ChartContainer>
        <InherentRiskSheet
          riskId={risk.id}
          initialProbability={risk.probability}
          initialImpact={risk.impact}
          onSuccess={() => setOpen(null)}
        />
      </CardContent>
    </Card>
  );
}

"use client";

import type { RiskImpact, RiskProbability } from "@bubba/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bubba/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@bubba/ui/chart";
import { cn } from "@bubba/ui/cn";
import {
  Cell,
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const IMPACT_VALUES = {
  very_low: 1,
  low: 2,
  medium: 3,
  high: 4,
  very_high: 5,
};

const PROBABILITY_VALUES = {
  very_low: 1,
  low: 2,
  medium: 3,
  high: 4,
  very_high: 5,
};

const RISK_LEVELS = {
  low: { color: "#22C55E" },
  medium: { color: "#F59E0B" },
  high: { color: "#EF4444" },
};

interface RiskMatrixProps {
  probability: RiskProbability;
  impact: RiskImpact;
  className?: string;
}

export function RiskMatrix({
  probability,
  impact,
  className,
}: RiskMatrixProps) {
  const data = [
    {
      x: IMPACT_VALUES[impact],
      y: PROBABILITY_VALUES[probability],
      z: 1000,
    },
  ];

  const getRiskLevel = (score: number) => {
    if (score <= 6) return "low";
    if (score <= 12) return "medium";
    return "high";
  };

  const score = IMPACT_VALUES[impact] * PROBABILITY_VALUES[probability];
  const riskLevel = getRiskLevel(score);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardDescription>
          Inherent Risk Score: {score} ({riskLevel})
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 w-full">
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              low: { color: RISK_LEVELS.low.color },
              medium: { color: RISK_LEVELS.medium.color },
              high: { color: RISK_LEVELS.high.color },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Impact"
                  domain={[0, 6]}
                  ticks={[1, 2, 3, 4, 5]}
                >
                  <Label value="Impact" offset={0} position="bottom" />
                </XAxis>
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Probability"
                  domain={[0, 6]}
                  ticks={[1, 2, 3, 4, 5]}
                >
                  <Label
                    value="Probability"
                    angle={-90}
                    position="left"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <ZAxis type="number" dataKey="z" range={[100, 100]} />
                <Scatter data={data}>
                  <Cell fill={RISK_LEVELS[riskLevel].color} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <ChartLegend className="mt-4">
          <ChartLegendContent
            payload={[
              { value: "Low Risk", color: RISK_LEVELS.low.color },
              { value: "Medium Risk", color: RISK_LEVELS.medium.color },
              { value: "High Risk", color: RISK_LEVELS.high.color },
            ]}
          />
        </ChartLegend>
      </CardContent>
    </Card>
  );
}

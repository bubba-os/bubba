"use client";

import { useI18n } from "@/locales/client";
import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@bubba/ui/chart";
import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";

interface StatusChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function StatusChart({ data }: StatusChartProps) {
  const t = useI18n();

  // Map status keys to their translations
  const config: ChartConfig = {
    open: {
      label: t("risk.dashboard.risk_status_chart.open"),
      color: "hsl(var(--chart-1))",
    },
    pending: {
      label: t("risk.dashboard.risk_status_chart.pending"),
      color: "hsl(var(--chart-2))",
    },
    closed: {
      label: t("risk.dashboard.risk_status_chart.closed"),
      color: "hsl(var(--chart-3))",
    },
    archived: {
      label: t("risk.dashboard.risk_status_chart.archived"),
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  // Initialize with all possible statuses
  const defaultData = {
    open: 0,
    pending: 0,
    closed: 0,
    archived: 0,
  };

  // Create a map of the incoming data
  const dataMap = Object.fromEntries(
    data.map((item) => [item.name.toLowerCase(), item.value]),
  );

  // Format data with translations
  const formattedData = Object.entries(defaultData).map(([key]) => ({
    name: config[key as keyof typeof config].label,
    value: dataMap[key] ?? 0,
    status: key,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("risk.dashboard.risk_status")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={formattedData}
            layout="vertical"
            margin={{
              left: 0,
              right: 16,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="value" layout="vertical" maxBarSize={30}>
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
              {formattedData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={config[entry.status as keyof typeof config].color}
                  radius={8}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

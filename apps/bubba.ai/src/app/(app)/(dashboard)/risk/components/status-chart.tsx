"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bubba-beta/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@bubba-beta/ui/chart";

import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";

interface StatusChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function StatusChart({ data }: StatusChartProps) {
  const config = {
    open: { label: "Open", color: "hsl(var(--chart-1))" },
    in_progress: { label: "In Progress", color: "hsl(var(--chart-3))" },
    closed: { label: "Closed", color: "hsl(var(--chart-3))" },
  } satisfies ChartConfig;

  const formattedData = data.map((item) => ({
    name: item.name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    value: item.value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Status</CardTitle>
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
            <Bar
              dataKey="value"
              layout="vertical"
              fill="hsl(var(--chart-1))"
              maxBarSize={30}
            >
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
              {formattedData.map((entry, index) => (
                <Cell name="Total" key={entry.name} radius={8} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

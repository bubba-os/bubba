"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@bubba/ui/chart";
import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";

interface DepartmentChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function DepartmentChart({ data }: DepartmentChartProps) {
  const config = {
    GOV: { label: "GOV" },
    HR: { label: "HR" },
    IT: { label: "IT" },
    ITSM: { label: "ITSM" },
    QMS: { label: "QMS" },
  } satisfies ChartConfig;

  const formattedData = data.map((item) => ({
    name: item.name.toUpperCase(),
    value: item.value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risks by Department</CardTitle>
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
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                config[value as keyof typeof config]?.label
              }
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

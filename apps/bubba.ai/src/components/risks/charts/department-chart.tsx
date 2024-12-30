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

interface DepartmentChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function DepartmentChart({ data }: DepartmentChartProps) {
  const t = useI18n();

  const config = {
    GOV: { label: "GOV" },
    HR: { label: "HR" },
    IT: { label: "IT" },
    ITSM: { label: "ITSM" },
    QMS: { label: "QMS" },
    ADMIN: { label: "ADMIN" },
  } satisfies ChartConfig;

  const defaultData = {
    gov: 0,
    hr: 0,
    it: 0,
    itsm: 0,
    qms: 0,
    admin: 0,
  };

  const dataMap = Object.fromEntries(
    data.map((item) => [item.name, item.value]),
  );

  const formattedData = Object.entries(defaultData).map(([key]) => ({
    name: key.toUpperCase(),
    value: dataMap[key] ?? 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("risk.dashboard.risks_by_department")}</CardTitle>
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

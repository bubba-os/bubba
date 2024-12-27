"use client";

import { ChartContainer } from "@bubba/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface MitigationTasksChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const TASK_COLORS = {
  completed: "#22c55e", // green-500
  pending: "#f97316", // orange-500
  overdue: "#ef4444", // red-500
};

export function MitigationTasksChart({ data }: MitigationTasksChartProps) {
  const config = {
    completed: { color: TASK_COLORS.completed },
    pending: { color: TASK_COLORS.pending },
    overdue: { color: TASK_COLORS.overdue },
  };

  return (
    <ChartContainer className="w-full h-[250px] sm:h-[300px]" config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            innerRadius="40%"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={true}
          >
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={
                  TASK_COLORS[
                    entry.name.toLowerCase() as keyof typeof TASK_COLORS
                  ]
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

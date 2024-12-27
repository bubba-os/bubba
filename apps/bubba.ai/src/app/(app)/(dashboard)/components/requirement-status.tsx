"use client";

import { PieChart } from "@/components/ui/pie-chart";
import type {
  Framework,
  OrganizationFramework,
  OrganizationRequirement,
} from "@bubba-beta/db";
import { Card, CardContent, CardHeader, CardTitle } from "@bubba-beta/ui/card";

interface Props {
  frameworks: (OrganizationFramework & {
    framework: Framework;
    organizationRequirements: OrganizationRequirement[];
  })[];
}

export function RequirementStatus({ frameworks }: Props) {
  const allRequirements = frameworks.flatMap((f) => f.organizationRequirements);

  const statusCounts = {
    not_started: allRequirements.filter((r) => r.status === "not_started")
      .length,
    in_progress: allRequirements.filter((r) => r.status === "in_progress")
      .length,
    compliant: allRequirements.filter((r) => r.status === "compliant").length,
  };

  const data = [
    {
      name: "Not Started",
      value: statusCounts.not_started,
      color: "hsl(var(--destructive))",
    },
    {
      name: "In Progress",
      value: statusCounts.in_progress,
      color: "hsl(var(--warning))",
    },
    {
      name: "Compliant",
      value: statusCounts.compliant,
      color: "hsl(var(--success))",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Requirements Status</CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart data={data} />
        <div className="mt-4 2xl:grid 2xl:grid-cols-3 gap-4 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
              <span className="ml-auto font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

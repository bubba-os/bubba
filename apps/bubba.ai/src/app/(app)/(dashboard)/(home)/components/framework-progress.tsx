"use client";

import type {
  Framework,
  OrganizationFramework,
  OrganizationRequirement,
} from "@bubba/db";
import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import { Progress } from "@bubba/ui/progress";

interface Props {
  frameworks: (OrganizationFramework & {
    framework: Framework;
    organizationRequirements: OrganizationRequirement[];
  })[];
}

export function FrameworkProgress({ frameworks }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Framework Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {frameworks.map((framework) => {
          const total = framework.organizationRequirements.length;
          const completed = framework.organizationRequirements.filter(
            (req) => req.status === "compliant",
          ).length;
          const progress = total ? (completed / total) * 100 : 0;

          return (
            <div key={framework.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{framework.framework.name}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

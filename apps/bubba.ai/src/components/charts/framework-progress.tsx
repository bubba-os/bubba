"use client";

import { useI18n } from "@/locales/client";
import type {
  Framework,
  OrganizationControl,
  OrganizationFramework,
} from "@bubba/db";
import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import { Progress } from "@bubba/ui/progress";
import Link from "next/link";

interface Props {
  frameworks: (OrganizationFramework & {
    organizationControl: OrganizationControl[];
    framework: Framework;
  })[];
}

export function FrameworkProgress({ frameworks }: Props) {
  const t = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("overview.framework_chart.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {frameworks.map((framework) => {
            const total = framework.organizationControl.length;
            const completed = framework.organizationControl.filter(
              (control) => control.status === "compliant",
            ).length;
            const progress = total ? (completed / total) * 100 : 0;

            return (
              <Link
                key={framework.id}
                href={`/frameworks/${framework.framework.id}`}
                className="block space-y-3 rounded-lg p-4 hover:bg-muted transition-colors duration-200"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {framework.framework.name}
                  </span>
                  <span className="font-medium text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

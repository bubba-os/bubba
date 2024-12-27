"use client";

import type { Assessment } from "@bubba/db";
import { Button } from "@bubba/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  assessments: Assessment[];
}

export function UpcomingAssessments({ assessments }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="border-b pb-4 last:border-0">
              <p className="font-medium">{assessment.frameworkId}</p>
              <p className="text-sm text-muted-foreground">
                Due {format(assessment.endDate, "MMM d, yyyy")}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

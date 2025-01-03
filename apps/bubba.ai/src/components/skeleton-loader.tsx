import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import { Skeleton } from "@bubba/ui/skeleton";
import React from "react";

interface Props {
  amount: number;
  prefix?: string;
}

export const SkeletonLoader = ({ amount, prefix = "item" }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-2">
      {Array.from({ length: amount }, (_, i) => (
        <Card key={`${prefix}-skeleton-${i + 1}`}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-full rounded-md" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

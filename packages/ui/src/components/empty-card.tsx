import { File, type LucideIcon } from "lucide-react";

import type React from "react";
import { cn } from "../utils/cn";
import { Card, CardDescription, CardTitle } from "./card";

interface EmptyCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: LucideIcon;
}

export function EmptyCard({
  title,
  description,
  icon: Icon = File,
  action,
  className,
  ...props
}: EmptyCardProps) {
  return (
    <Card
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-4 bg-transparent p-6 border-none",
        className,
      )}
      {...props}
    >
      <div className="shrink-0 rounded-full border border-dashed p-4">
        <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </div>
      {action ? action : null}
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ISidenavOption {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
  beta?: boolean;
}

export function AdminSidenavOption(props: ISidenavOption) {
  return (
    <Link href={props.href}>
      <Button
        variant="ghost"
        className={cn(
          "flex w-full items-center justify-start gap-2 text-foreground",
          props.isActive && "bg-muted-foreground/10 text-primary",
        )}
      >
        {props.icon}
        {props.label}
        {props.beta && (
          <div className="border-brand-primary bg-brand-quaternary text-text-primary rounded-lg border px-2 py-1 text-xs">
            Beta
          </div>
        )}
      </Button>
    </Link>
  );
}

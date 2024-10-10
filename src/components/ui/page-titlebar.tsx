import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { type Session } from "next-auth";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

interface PageTitleBarProps {
  title: string;
  subtitle?: React.ReactNode;
  breadcrumb?: {
    href?: string;
    label: string;
  };
  actions?: {
    label: string;
    href: string;
    icon?: React.ElementType;
  }[];
  children?: React.ReactNode;
  loading?: boolean;
  session?: Session | null;
}

export default function PageTitleBar({
  title,
  subtitle,
  breadcrumb,
  actions,
  loading = false,
}: PageTitleBarProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="relative w-full">
        {breadcrumb ? (
          <div className="mb-2 flex w-full justify-between text-sm text-muted-foreground">
            {breadcrumb && (
              <div className="flex items-center">
                {breadcrumb.href ? (
                  <Link
                    href={breadcrumb.href}
                    className="hover:text-foreground hover:underline"
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <span>{breadcrumb.label}</span>
                )}
                <span className="mx-2">/</span>
                <span className="font-medium text-foreground">{title}</span>
              </div>
            )}
          </div>
        ) : null}

        {loading ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <div>
            <div className="flex flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              {actions && (
                <div className="ml-4 flex items-center gap-2">
                  {actions.map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      className={buttonVariants({ size: "sm" })}
                    >
                      {action.icon && <action.icon className="mr-2 h-6 w-6" />}
                      {action.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {subtitle && (
              <div className="text-sm text-muted-foreground">{subtitle}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import {
  PolicyStatus,
  type StatusType,
} from "@/components/policies/policy-status";
import { StatusDate } from "@/components/status-date";
import { useI18n } from "@/locales/client";
import { Button } from "@bubba/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type PolicyType = {
  id: string;
  name: string;
  published: boolean;
  needsReview: boolean;
  lastUpdated: Date | null;
};

export function columns(): ColumnDef<PolicyType>[] {
  const t = useI18n();

  return [
    {
      id: "name",
      accessorKey: "name",
      header: t("policies.table.name"),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <Button variant="link" className="p-0 justify-start" asChild>
              <Link href={`/policies/${row.original.id}`}>
                <span className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  {row.original.name}
                </span>
              </Link>
            </Button>
          </div>
        );
      },
    },
    {
      id: "published",
      accessorKey: "published",
      header: t("policies.table.status"),
      cell: ({ row }) => {
        const status = row.original.published ? "published" : "draft";

        return (
          <div className="flex items-center gap-2">
            <PolicyStatus status={status.toLowerCase() as StatusType} />
          </div>
        );
      },
    },
    {
      id: "lastUpdated",
      accessorKey: "lastUpdated",
      header: () => (
        <span className="hidden md:table-cell">
          {t("policies.table.last_updated")}
        </span>
      ),
      cell: ({ row }) => {
        const date = row.original.lastUpdated;

        return (
          <div className="hidden md:table-cell">
            <StatusDate date={date} />
          </div>
        );
      },
    },
  ];
}

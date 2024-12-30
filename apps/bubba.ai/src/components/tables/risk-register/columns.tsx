"use client";
import { AssignedUser } from "@/components/assigned-user";
import { RISK_COLORS } from "@/constants/colors";
import { useI18n } from "@/locales/client";
import type { Departments, RiskCategory, RiskStatus } from "@bubba/db";
import { Badge } from "@bubba/ui/badge";
import { Button } from "@bubba/ui/button";
import { cn } from "@bubba/ui/cn";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type RiskRegisterType = {
  id: string;
  title: string;
  status: RiskStatus;
  department?: Departments;
  ownerId: string;
  owner: {
    image: string;
    name: string;
  };
};

export function columns(): ColumnDef<RiskRegisterType>[] {
  const t = useI18n();

  return [
    {
      id: "title",
      accessorKey: "title",
      header: t("risk.register.table.risk"),
      cell: ({ row }) => {
        return (
          <span className="truncate">
            <Button variant="link" className="p-0" asChild>
              <Link href={`/risk/${row.original.id}`}>
                {row.original.title}
              </Link>
            </Button>
          </span>
        );
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: t("risk.register.table.status"),
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-2.5 rounded-full ring-1",
                status === "open"
                  ? "bg-[#ffc107]"
                  : status === "pending"
                    ? "bg-[#0ea5e9]"
                    : status === "closed"
                      ? "bg-[#22c55e]"
                      : "bg-[#6b7280]",
              )}
            />
            {status
              .toLowerCase()
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
        );
      },
    },
    {
      id: "department",
      accessorKey: "department",
      header: () => (
        <span className="hidden sm:table-cell">
          {t("risk.register.table.department")}
        </span>
      ),
      cell: ({ row }) => {
        const department = row.original.department;

        if (!department) {
          return <span className="hidden sm:table-cell">—</span>;
        }

        return (
          <span className="hidden sm:table-cell">
            <Badge variant="secondary">
              {department.replace(/_/g, " ").toUpperCase()}
            </Badge>
          </span>
        );
      },
    },
    {
      id: "ownerId",
      accessorKey: "ownerId",
      header: () => (
        <span className="hidden sm:table-cell">
          {t("risk.register.table.assigned_to")}
        </span>
      ),
      cell: ({ row }) => {
        return (
          <div className="hidden sm:table-cell">
            <AssignedUser
              fullName={row.original.owner?.name}
              avatarUrl={row.original.owner?.image}
            />
          </div>
        );
      },
    },
  ];
}

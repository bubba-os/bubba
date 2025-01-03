"use client";

import {
  DisplayFrameworkStatus,
  type StatusType,
} from "@/components/frameworks/framework-status";
import { useI18n } from "@/locales/client";
import type { ArtifactType, ComplianceStatus } from "@bubba/db";
import type { ColumnDef } from "@tanstack/react-table";

export type FrameworkControlType = {
  id: string;
  name: string;
  code: string;
  description: string | null;
  categoryId: string;
  status: ComplianceStatus;
  artifacts: {
    id: string;
    organizationControlId: string;
    artifactId: string;
  }[];
  frameworkId: string;
  requiredArtifactTypes: ArtifactType[];
};

export function columns(): ColumnDef<FrameworkControlType>[] {
  const t = useI18n();

  return [
    {
      id: "name",
      accessorKey: "name",
      header: t("frameworks.controls.table.control"),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col w-[300px]">
            <span className="font-medium truncate">{row.original.name}</span>
            <span className="text-sm text-muted-foreground truncate">
              {row.original.code}
            </span>
          </div>
        );
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: t("frameworks.controls.table.status"),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="w-[200px]">
            <DisplayFrameworkStatus
              status={status.toLowerCase() as StatusType}
            />
          </div>
        );
      },
    },
  ];
}

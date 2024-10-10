"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type PolicyStatus, type PolicyType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import React from "react";
import { Badge } from "@/components/ui/badge";

export type Policy = {
  id: string;
  title: string;
  policyType: PolicyType;
  status: PolicyStatus;
  createdAt: Date;
  updatedAt: Date;
  assignedToId: string;
  assignedTo: {
    id: string;
    name: string | null;
  };
};

export const columns: ColumnDef<Policy>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Policy",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{row.original.title}</span>
            <span className="text-xs text-muted-foreground md:hidden">
              {row.original.createdAt.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="hidden text-xs text-muted-foreground md:block">
              {row.original.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "assignedTo",
    accessorKey: "assignedTo.name",
    header: "Assigned To",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-sm">
              {row.original.assignedTo?.name?.split("\n")[0]}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <Badge
              variant={row.original.status === "DRAFT" ? "outline" : "default"}
            >
              {row.original.status === "DRAFT"
                ? "Draft"
                : row.original.status === "REVIEW"
                  ? "Review"
                  : "Published"}
            </Badge>
          </div>
        </div>
      );
    },
  },
];

export function DataTableSkeleton() {
  return (
    <div className="w-full">
      <div className="block">
        <Table>
          <TableBody>
            {[...(Array(6) as Array<unknown>)].map((_, index) => (
              <TableRow key={index.toString()} className="hover:bg-muted/50">
                <TableCell className={cn("border-r-[0px] py-4")}>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex flex-col space-y-2">
                      <Skeleton className="h-3 w-[200px]" />
                      <Skeleton className="h-2 w-[150px]" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function DataTable({ data }: { data: Policy[] }) {
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() =>
                  row.original.status === "DRAFT"
                    ? router.push(
                        `/dashboard/policies/draft/${row.original.id}`,
                      )
                    : router.push(
                        `/dashboard/policies/policy/${row.original.id}`,
                      )
                }
                className="cursor-pointer hover:bg-muted/50"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getAllCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn("border-r-[0px] py-4")}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

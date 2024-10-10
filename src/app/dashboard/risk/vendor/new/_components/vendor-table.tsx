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
import {
  type VendorCategory,
  type VendorRisk,
  type VendorStatus,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import React from "react";

export type Vendor = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  assignedToId: string;
  assignedTo: {
    id: string;
    name: string | null;
  };
  category: VendorCategory;
  risk: VendorRisk;
  url: string;
  status: VendorStatus;
};

export const columns: ColumnDef<Vendor>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Vendor",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{row.original.name}</span>
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
            <span className="text-xs text-muted-foreground">
              {row.original.status === "NOT_STARTED"
                ? "Not Started"
                : row.original.status === "IN_PROGRESS"
                  ? "In Progress"
                  : row.original.status === "NEEDS_REASSESSMENT"
                    ? "Reassess"
                    : "Assessed"}
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
    id: "category",
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <Badge>
              {row.original.category.charAt(0).toUpperCase() +
                row.original.category.slice(1).toLowerCase()}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    id: "risk",
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <Badge>
              {row.original.risk.charAt(0).toUpperCase() +
                row.original.risk.slice(1).toLowerCase()}
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

export function DataTable({ data }: { data: Vendor[] }) {
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
                  router.push(`/dashboard/risk/vendor/${row.original.id}`)
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

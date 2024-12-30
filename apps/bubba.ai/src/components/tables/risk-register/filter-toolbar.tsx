"use client";

import { CreateRiskSheet } from "@/components/sheets/create-risk-sheet";
import { useI18n } from "@/locales/client";
import { Departments, RiskCategory, RiskStatus } from "@bubba/db";
import { Button } from "@bubba/ui/button";
import { Input } from "@bubba/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bubba/ui/select";
import { Skeleton } from "@bubba/ui/skeleton";
import { Search, X } from "lucide-react";
import { Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { useCallback } from "react";
import { cn } from "../../../../../../packages/ui/src/utils";

const riskStatuses = Object.values(RiskStatus);
const departments = Object.values(Departments).filter((d) => d !== "none");

type Props = {
  isEmpty?: boolean;
};

const statusTranslationKeys = {
  open: "risk.register.statuses.open",
  pending: "risk.register.statuses.pending",
  closed: "risk.register.statuses.closed",
  archived: "risk.register.statuses.archived",
} as const;

export function FilterToolbar({ isEmpty }: Props) {
  const t = useI18n();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useQueryState("create-risk-sheet");

  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    history: "push",
    parse: (value) => value || null,
  });

  const [category, setCategory] = useQueryState("category", {
    shallow: false,
    history: "push",
    parse: (value) => value || null,
  });

  const [status, setStatus] = useQueryState("status", {
    shallow: false,
    history: "push",
    parse: (value) => value || null,
  });

  const [department, setDepartment] = useQueryState("department", {
    shallow: false,
    history: "push",
    parse: (value) => value || null,
  });

  const handleReset = useCallback(() => {
    startTransition(() => {
      Promise.all([
        setSearch(null),
        setCategory(null),
        setStatus(null),
        setDepartment(null),
      ]);
    });
  }, [setSearch, setCategory, setStatus, setDepartment]);

  const hasFilters = search || category || status || department;

  if (isEmpty) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4 opacity-20 pointer-events-none blur-[7px]">
        <div className="relative flex-1 md:max-w-sm">
          <Skeleton className={cn("h-10", isEmpty && "animate-none")} />
        </div>

        <div className="md:flex gap-2 md:flex-row md:items-center hidden">
          <Skeleton
            className={cn("h-10 w-[200px]", isEmpty && "animate-none")}
          />
          <Skeleton
            className={cn("h-10 w-[200px]", isEmpty && "animate-none")}
          />
          <Skeleton
            className={cn("h-9 w-[120px]", isEmpty && "animate-none")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
      <div className="relative flex-1 sm:max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("risk.register.filters.search")}
          className="pl-8"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value || null)}
        />
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <div className="sm:flex gap-2 sm:flex-row sm:items-center hidden">
          <Select
            value={status || ""}
            onValueChange={(value) => setStatus(value || null)}
          >
            <SelectTrigger className="w-[200px] min-w-[200px]">
              <SelectValue placeholder={t("risk.register.filters.status")} />
            </SelectTrigger>
            <SelectContent>
              {riskStatuses.map((stat) => (
                <SelectItem key={stat} value={stat}>
                  {t(
                    statusTranslationKeys[
                      stat.toLowerCase() as keyof typeof statusTranslationKeys
                    ],
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={department || ""}
            onValueChange={(value) => setDepartment(value || null)}
          >
            <SelectTrigger className="w-[200px] min-w-[200px]">
              <SelectValue
                placeholder={t("risk.register.filters.department")}
              />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept.replace(/_/g, " ").toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={isPending}
          >
            <X className="h-4 w-4 mr-2" />
            {t("risk.register.filters.clear")}
          </Button>
        )}

        <Button
          onClick={() => setOpen("true")}
          variant="outline"
          size="icon"
          className="hidden sm:flex"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <CreateRiskSheet />
    </div>
  );
}

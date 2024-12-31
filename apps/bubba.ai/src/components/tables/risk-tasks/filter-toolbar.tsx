"use client";

import { CreateRiskSheet } from "@/components/sheets/create-risk-sheet";
import { CreateTaskSheet } from "@/components/sheets/create-task-sheet";
import { useI18n } from "@/locales/client";
import { RiskTaskStatus, type User } from "@bubba/db";
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

const riskStatuses = Object.values(RiskTaskStatus);

type Props = {
  isEmpty?: boolean;
  users: {
    id: string;
    name: string | null;
  }[];
};

const statusTranslationKeys = {
  open: "risk.tasks.statuses.open",
  pending: "risk.tasks.statuses.pending",
  closed: "risk.tasks.statuses.closed",
  archived: "risk.tasks.statuses.archived",
} as const;

export function FilterToolbar({ isEmpty, users }: Props) {
  const t = useI18n();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useQueryState("create-task-sheet");

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

  const [ownerId, setOwnerId] = useQueryState("ownerId", {
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
        setOwnerId(null),
      ]);
    });
  }, [setSearch, setCategory, setStatus, setOwnerId]);

  const hasFilters = search || status || ownerId;

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
    <div className="flex gap-2 flex-row items-center justify-between mb-4">
      <div className="relative flex-1 sm:max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("risk.tasks.filters.search")}
          className="pl-8"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value || null)}
        />
      </div>

      <div className="flex">
        <Button onClick={() => setOpen("true")} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <CreateTaskSheet />
    </div>
  );
}

"use client";

import { useI18n } from "@/locales/client";
import { Button } from "@bubba/ui/button";
import { cn } from "@bubba/ui/cn";
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
import { useQueryState } from "nuqs";
import { useTransition } from "react";
import { useCallback } from "react";

type Props = {
  isEmpty?: boolean;
};

export function FilterToolbar({ isEmpty }: Props) {
  const t = useI18n();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useQueryState("search", {
    shallow: false,
    history: "push",
    parse: (value) => value || null,
  });

  const [status, setStatus] = useQueryState("status", {
    shallow: false,
    history: "push",
    parse: (value) => value || null,
  });

  const handleReset = useCallback(() => {
    startTransition(() => {
      setSearch(null);
      setStatus(null);
    });
  }, [setSearch, setStatus]);

  const hasFilters = search || status;

  if (isEmpty) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4 opacity-20 pointer-events-none blur-[7px]">
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
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-between flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("policies.filters.search")}
            className="pl-8"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value || null)}
          />
        </div>

        <div className="hidden md:flex">
          <Select
            value={status || "all"}
            onValueChange={(value) => setStatus(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("policies.table.status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("policies.filters.all")}</SelectItem>
              <SelectItem value="published">
                {t("policies.table.published")}
              </SelectItem>
              <SelectItem value="needs_review">
                {t("policies.table.needs_review")}
              </SelectItem>
              <SelectItem value="draft">{t("policies.table.draft")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          disabled={isPending}
        >
          <X className="h-4 w-4 mr-2" />
          {t("policies.filters.clear")}
        </Button>
      )}
    </div>
  );
}

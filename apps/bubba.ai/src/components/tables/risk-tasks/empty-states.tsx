"use client";

import { CreateTaskSheet } from "@/components/sheets/create-task-sheet";
import { useI18n } from "@/locales/client";
import { Button } from "@bubba/ui/button";
import { Icons } from "@bubba/ui/icons";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

type Props = {
  hasFilters?: boolean;
};

export function NoResults({ hasFilters }: Props) {
  const t = useI18n();
  const router = useRouter();
  const params = useParams<{ riskId: string }>();

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Icons.Transactions2 className="mb-4" />
        <div className="text-center mb-6 space-y-2">
          <h2 className="font-medium text-lg">{t("risk.tasks.empty.title")}</h2>
          <p className="text-[#606060] text-sm">
            {hasFilters
              ? t("risk.tasks.empty.description_filtered")
              : t("risk.tasks.empty.description_no_tasks")}
          </p>
        </div>

        {hasFilters && (
          <Button
            variant="outline"
            onClick={() => router.push(`/risk/${params.riskId}/tasks`)}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

export function NoTasks() {
  const t = useI18n();

  const [open, setOpen] = useQueryState("create-task-sheet");

  return (
    <div className="mt-24 absolute w-full top-0 left-0 flex items-center justify-center z-20">
      <div className="text-center max-w-sm mx-auto flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-2">
          {t("risk.tasks.empty.create")}
        </h2>
        <p className="text-sm text-[#878787] mb-6">
          {t("risk.tasks.empty.description_create")}
        </p>
        <Button onClick={() => setOpen("true")}>
          <Plus className="h-4 w-4 mr-2" />
          {t("risk.tasks.empty.create")}
        </Button>
      </div>

      <CreateTaskSheet />
    </div>
  );
}

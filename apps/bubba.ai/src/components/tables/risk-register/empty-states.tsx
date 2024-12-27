"use client";

import { CreateRiskSheet } from "@/components/sheets/create-risk-sheet";
import { Button } from "@bubba-beta/ui/button";
import { Icons } from "@bubba-beta/ui/icons";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

type Props = {
  hasFilters?: boolean;
};

export function NoResults({ hasFilters }: Props) {
  const router = useRouter();

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Icons.Transactions2 className="mb-4" />
        <div className="text-center mb-6 space-y-2">
          <h2 className="font-medium text-lg">No results</h2>
          <p className="text-[#606060] text-sm">
            {hasFilters
              ? "Try another search, or adjusting the filters"
              : "There are no risks created yet"}
          </p>
        </div>

        {hasFilters && (
          <Button
            variant="outline"
            onClick={() => router.push("/risk/register")}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}

export function NoRisks() {
  const [open, setOpen] = useQueryState("create-risk-sheet");

  return (
    <div className="mt-24 absolute w-full top-0 left-0 flex items-center justify-center z-20">
      <div className="text-center max-w-sm mx-auto flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-2">
          Create a risk to get started
        </h2>
        <p className="text-sm text-[#878787] mb-6">
          Track and score risks, create and assign mitigation tasks for your
          team, and manage your risk register all in one simple interface.
        </p>
        <Button onClick={() => setOpen("true")} className="hidden sm:flex">
          <Plus className="h-4 w-4 mr-2" />
          Create risk
        </Button>
      </div>

      <CreateRiskSheet />
    </div>
  );
}

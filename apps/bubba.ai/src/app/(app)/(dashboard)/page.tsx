import { Cookies } from "@/utils/constants";
import { cn } from "@bubba-beta/ui/cn";
import { startOfMonth, startOfYear, subMonths } from "date-fns";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Overview | Bubba",
};

export default async function Overview() {
  return (
    <>
      <div>
        <div className="h-[530px] mb-4">Hey!</div>
      </div>
    </>
  );
}

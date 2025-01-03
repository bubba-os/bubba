import { useI18n } from "@/locales/client";
import { cn } from "@bubba/ui/cn";

export const STATUS_TYPES = [
  "compliant",
  "non_compliant",
  "not_started",
] as const;

export type StatusType = Exclude<
  (typeof STATUS_TYPES)[number],
  "draft" | "published"
>;

const STATUS_COLORS: Record<StatusType, string> = {
  compliant: "#22c55e",
  non_compliant: "#f43f5e",
  not_started: "#f43f5e",
} as const;

export function DisplayFrameworkStatus({ status }: { status: StatusType }) {
  const t = useI18n();

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn("size-2.5 rounded-full ")}
        style={{ backgroundColor: STATUS_COLORS[status] ?? "  " }}
      />
      {t(`frameworks.controls.statuses.${status}`)}
    </div>
  );
}

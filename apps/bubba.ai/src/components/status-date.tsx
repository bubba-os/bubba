import { cn } from "@bubba/ui/cn";

const getStatusColor = (dueDate: Date, isClosed?: boolean): string => {
  const now = new Date();

  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (isClosed) return "#22c55e";
  if (daysUntilDue > 30) return "#0ea5e9";
  if (daysUntilDue > 7) return "#ffc107";

  return "#ef4444";
};

const getLastUpdatedColor = (date: Date): string => {
  const now = new Date();
  const daysSinceLastUpdated = Math.ceil(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  return daysSinceLastUpdated > 90 ? "#0ea5e9" : "#ef4444";
};

export function StatusDate({
  date,
  isClosed,
  lastUpdated,
}: { date: Date | null; isClosed?: boolean; lastUpdated?: boolean }) {
  if (!date)
    return (
      <div className="flex items-center gap-2">
        <div className="size-2.5 rounded-full bg-muted-foreground" />{" "}
        <span>Never</span>
      </div>
    );

  if (lastUpdated) {
    return (
      <div className="flex items-center gap-2">
        <div
          className={cn("size-2.5 rounded-full")}
          style={{ backgroundColor: getLastUpdatedColor(date) }}
        />
        <span>{date.toLocaleDateString()}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn("size-2.5 rounded-full")}
        style={{ backgroundColor: getStatusColor(date, isClosed) }}
      />
      <span>{date.toLocaleDateString()}</span>
    </div>
  );
}

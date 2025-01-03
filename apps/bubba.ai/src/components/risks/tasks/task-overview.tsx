"use client";

import { UpdateTaskForm } from "@/components/forms/risks/task/update-task-form";
import { TaskOverviewSheet } from "@/components/sheets/task-overview-sheet";
import { useI18n } from "@/locales/client";
import type { RiskMitigationTask, User } from "@bubba/db";
import { Alert, AlertDescription, AlertTitle } from "@bubba/ui/alert";
import { Button } from "@bubba/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import { PencilIcon, ShieldAlert } from "lucide-react";
import { useQueryState } from "nuqs";
import React from "react";

export function TaskOverview({
  task,
  users,
}: {
  task: RiskMitigationTask & { owner: User | null };
  users: User[];
}) {
  const t = useI18n();
  const [open, setOpen] = useQueryState("task-overview-sheet");

  return (
    <div className="space-y-4">
      <Alert>
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>
          <div className="flex items-center justify-between gap-2">
            {task.title}
            <Button
              size="icon"
              variant="ghost"
              className="p-0 m-0 size-auto"
              onClick={() => setOpen("true")}
            >
              <PencilIcon className="h-3 w-3" />
            </Button>
          </div>
        </AlertTitle>
        <AlertDescription className="mt-4">{task.description}</AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between gap-2">
              Overview
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateTaskForm task={task} users={users} />
        </CardContent>
      </Card>

      <TaskOverviewSheet task={task} />
    </div>
  );
}

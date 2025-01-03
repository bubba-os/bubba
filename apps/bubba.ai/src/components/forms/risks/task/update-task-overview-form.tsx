"use client";

import { updateTaskAction } from "@/actions/risk/task/update-task-action";
import { updateTaskSchema } from "@/actions/schema";
import { useI18n } from "@/locales/client";
import { Departments, type RiskMitigationTask } from "@bubba/db";
import { Button } from "@bubba/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@bubba/ui/form";
import { Input } from "@bubba/ui/input";
import { Textarea } from "@bubba/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function UpdateTaskOverviewForm({
  task,
}: {
  task: RiskMitigationTask;
}) {
  const t = useI18n();
  const [open, setOpen] = useQueryState("task-update-overview-sheet");

  const updateTask = useAction(updateTaskAction, {
    onSuccess: () => {
      toast.success(t("risk.form.update_risk_success"));
      setOpen(null);
    },
    onError: () => {
      toast.error(t("risk.form.update_risk_error"));
    },
  });

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      status: task.status,
      ownerId: task.ownerId ?? undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof updateTaskSchema>) => {
    updateTask.execute({
      id: data.id,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      status: data.status,
      ownerId: data.ownerId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    className="mt-3"
                    placeholder="Enter a name for the task"
                    autoCorrect="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="mt-3 min-h-[80px]"
                    placeholder="Enter a description for the task"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-8">
          <Button type="submit" disabled={updateTask.status === "executing"}>
            {updateTask.status === "executing" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t("common.save")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { updateTaskAction } from "@/actions/risk/task/update-task-action";
import { updateTaskSchema } from "@/actions/schema";
import { SelectUser } from "@/components/select-user";
import { STATUS_TYPES, Status, type StatusType } from "@/components/status";
import { useI18n } from "@/locales/client";
import { type RiskMitigationTask, RiskTaskStatus, type User } from "@bubba/db";
import { Button } from "@bubba/ui/button";
import { Calendar } from "@bubba/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@bubba/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@bubba/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bubba/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { cn } from "../../../../../../../packages/ui/src/utils";

export function UpdateTaskForm({
  task,
  users,
}: {
  task: RiskMitigationTask;
  users: User[];
}) {
  const t = useI18n();

  const updateTask = useAction(updateTaskAction, {
    onSuccess: () => {
      toast.success("Task updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm<z.infer<typeof updateTaskSchema>>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: task.id,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      ownerId: task.ownerId ?? undefined,
      status: task.status ?? RiskTaskStatus.open,
    },
  });

  const onSubmit = (data: z.infer<typeof updateTaskSchema>) => {
    updateTask.execute({
      id: data.id,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      ownerId: data.ownerId,
      status: data.status as RiskTaskStatus,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ownerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Owner</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    onOpenChange={() => form.handleSubmit(onSubmit)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a task owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectUser
                        isLoading={false}
                        onSelect={field.onChange}
                        selectedId={field.value}
                        users={users}
                      />
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a task status">
                        {field.value && (
                          <Status status={field.value as StatusType} />
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_TYPES.map((status) => (
                        <SelectItem key={status} value={status}>
                          <Status status={status} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-4">
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

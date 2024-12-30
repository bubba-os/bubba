"use client";

import { updateRiskAction } from "@/actions/risk/update-risk-action";
import { updateRiskSchema } from "@/actions/schema";
import { SelectUser } from "@/components/select-user";
import { STATUS_TYPES, Status, type StatusType } from "@/components/status";
import { useI18n } from "@/locales/client";
import {
  Departments,
  type Risk,
  RiskCategory,
  RiskStatus,
  type User,
} from "@bubba/db";
import { Button } from "@bubba/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@bubba/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bubba/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function UpdateRiskOverview({
  risk,
  users,
}: {
  risk: Risk;
  users: User[];
}) {
  const t = useI18n();

  const updateRisk = useAction(updateRiskAction, {
    onSuccess: () => {
      toast.success("Risk updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm<z.infer<typeof updateRiskSchema>>({
    resolver: zodResolver(updateRiskSchema),
    defaultValues: {
      id: risk.id,
      title: risk.title ?? "",
      description: risk.description ?? "",
      ownerId: risk.ownerId ?? undefined,
      category: risk.category ?? RiskCategory.operations,
      department: risk.department ?? Departments.admin,
      status: risk.status ?? RiskStatus.open,
    },
  });

  const onSubmit = (data: z.infer<typeof updateRiskSchema>) => {
    updateRisk.execute({
      id: data.id,
      title: data.title,
      description: data.description,
      ownerId: data.ownerId,
      category: data.category,
      department: data.department,
      status: data.status,
    });
  };

  console.log(form.formState.defaultValues);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ownerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Owner</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    onOpenChange={() => form.handleSubmit(onSubmit)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a risk owner" />
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
                <FormLabel>Risk Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a risk status">
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Category</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a risk category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(RiskCategory).map((category) => {
                        const formattedCategory = category
                          .toLowerCase()
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1),
                          )
                          .join(" ");
                        return (
                          <SelectItem key={category} value={category}>
                            {formattedCategory}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Department</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a risk department" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Departments).map((department) => {
                        const formattedDepartment = department.toUpperCase();

                        return (
                          <SelectItem key={department} value={department}>
                            {formattedDepartment}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={updateRisk.status === "executing"}>
            {updateRisk.status === "executing" ? (
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

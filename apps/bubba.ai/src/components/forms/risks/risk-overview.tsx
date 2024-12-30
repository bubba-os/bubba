"use client";

import { updateRiskAction } from "@/actions/risk/update-risk-action";
import { updateRiskSchema } from "@/actions/schema";
import { SelectUser } from "@/components/select-user";
import { Departments, type Risk, RiskCategory, type User } from "@bubba/db";
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

export async function UpdateRiskOverview({
  risk,
  users,
}: {
  risk: Risk;
  users: User[];
}) {
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
      ownerId: risk.ownerId ?? undefined,
      category: risk.category ?? RiskCategory.operations,
      department: risk.department ?? Departments.admin,
    },
  });

  const onSubmit = (data: z.infer<typeof updateRiskSchema>) => {
    updateRisk.execute(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
        />{" "}
        <div className="flex justify-end">
          <Button type="submit" disabled={updateRisk.status === "executing"}>
            {updateRisk.status === "executing" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

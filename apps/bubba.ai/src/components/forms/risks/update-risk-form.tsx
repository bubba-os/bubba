"use client";

import { updateRiskAction } from "@/actions/risk/update-risk-action";
import { updateRiskSchema } from "@/actions/schema";
import { useI18n } from "@/locales/client";
import { Departments, type Risk } from "@bubba/db";
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

export function UpdateRiskForm({
  risk,
}: {
  risk: Risk;
}) {
  const t = useI18n();
  const [open, setOpen] = useQueryState("risk-overview-sheet");

  const updateRisk = useAction(updateRiskAction, {
    onSuccess: () => {
      toast.success(t("risk.form.update_risk_success"));
      setOpen(null);
    },
    onError: () => {
      toast.error(t("risk.form.update_risk_error"));
    },
  });

  const form = useForm<z.infer<typeof updateRiskSchema>>({
    resolver: zodResolver(updateRiskSchema),
    defaultValues: {
      id: risk.id,
      title: risk.title,
      description: risk.description,
      category: risk.category,
      department: risk.department ?? Departments.admin,
      status: risk.status,
      ownerId: risk.ownerId ?? undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof updateRiskSchema>) => {
    updateRisk.execute({
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      department: data.department,
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
                <FormLabel>Risk Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    className="mt-3"
                    placeholder="Enter a name for the risk"
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
                    placeholder="Enter a description for the risk"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end mt-8">
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

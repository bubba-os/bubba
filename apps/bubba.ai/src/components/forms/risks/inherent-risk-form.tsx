"use client";

import { updateInherentRiskAction } from "@/actions/risk/update-inherent-risk-action";
import { updateInherentRiskSchema } from "@/actions/schema";
import { useI18n } from "@/locales/client";
import { Button } from "@bubba/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@bubba/ui/form";
import { Slider } from "@bubba/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

interface InherentRiskFormProps {
  riskId: string;
  initialProbability?: number;
  initialImpact?: number;
}

export function InherentRiskForm({
  riskId,
  initialProbability,
  initialImpact,
}: InherentRiskFormProps) {
  const [_, setOpen] = useQueryState("inherent-risk-sheet");
  const t = useI18n();

  const updateInherentRisk = useAction(updateInherentRiskAction, {
    onSuccess: () => {
      toast.success(t("risk.form.update_inherent_risk_success"));
      setOpen(null);
    },
    onError: () => {
      toast.error(t("risk.form.update_inherent_risk_error"));
    },
  });

  const form = useForm<z.infer<typeof updateInherentRiskSchema>>({
    resolver: zodResolver(updateInherentRiskSchema),
    defaultValues: {
      id: riskId,
      probability: initialProbability,
      impact: initialImpact,
    },
  });

  const onSubmit = (data: z.infer<typeof updateInherentRiskSchema>) => {
    updateInherentRisk.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="probability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("risk.metrics.probability")}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="py-4"
                />
              </FormControl>
              <FormDescription className="text-right">
                {field.value} / 10
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="impact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("risk.metrics.impact")}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="py-4"
                />
              </FormControl>
              <FormDescription className="text-right">
                {field.value} / 10
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={updateInherentRisk.status === "executing"}
          >
            {updateInherentRisk.status === "executing" ? (
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

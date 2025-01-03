"use client";

import { createRiskCommentAction } from "@/actions/risk/create-risk-comment";
import { createRiskCommentSchema } from "@/actions/schema";
import { useI18n } from "@/locales/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bubba/ui/accordion";
import { Button } from "@bubba/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bubba/ui/form";
import { Textarea } from "@bubba/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function CreateRiskCommentForm() {
  const t = useI18n();
  const [_, setCreateRiskCommentSheet] = useQueryState("risk-comment-sheet");
  const params = useParams<{ riskId: string }>();

  const createRiskComment = useAction(createRiskCommentAction, {
    onSuccess: () => {
      toast.success(t("risk.comments.success"));
      setCreateRiskCommentSheet(null);
    },
    onError: () => {
      toast.error(t("risk.tasks.comments.error"));
    },
  });

  const form = useForm<z.infer<typeof createRiskCommentSchema>>({
    resolver: zodResolver(createRiskCommentSchema),
    defaultValues: {
      content: "",
      riskId: params.riskId,
    },
  });

  const onSubmit = (data: z.infer<typeof createRiskCommentSchema>) => {
    createRiskComment.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="h-[calc(100vh-250px)] scrollbar-hide overflow-auto">
          <div>
            <Accordion type="multiple" defaultValue={["task"]}>
              <AccordionItem value="task">
                <AccordionTrigger>
                  {t("risk.tasks.comments.new")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              {...field}
                              autoFocus
                              className="mt-3"
                              placeholder={t("risk.tasks.comments.placeholder")}
                              autoCorrect="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              disabled={createRiskComment.status === "executing"}
            >
              <div className="flex items-center justify-center">
                {t("risk.comments.save")}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

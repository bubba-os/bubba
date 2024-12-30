"use client";

import { sendFeebackAction } from "@/actions/send-feedback-action";
import { useI18n } from "@/locales/client";
import { Button } from "@bubba/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@bubba/ui/popover";
import { Textarea } from "@bubba/ui/textarea";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

export function FeedbackForm() {
  const [value, setValue] = useState("");
  const t = useI18n();

  const action = useAction(sendFeebackAction, {
    onSuccess: () => {
      toast.success(t("header.feedback.success"));
      setValue("");
    },
    onError: () => {
      toast.error(t("header.feedback.error"));
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild className="hidden md:block">
        <Button
          variant="outline"
          className="rounded-full font-normal h-[32px] p-0 px-3 text-xs text-[#878787]"
        >
          {t("header.feedback.button")}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] h-[200px]"
        sideOffset={10}
        align="end"
      >
        {action.status === "hasSucceeded" ? (
          <div className="flex items-center justify-center flex-col space-y-1 mt-10 text-center">
            <p className="font-medium text-sm">{t("header.feedback.title")}</p>
            <p className="text-sm text-[#4C4C4C]">
              {t("header.feedback.description")}
            </p>
          </div>
        ) : (
          <form className="space-y-4">
            <Textarea
              name="feedback"
              value={value}
              required
              autoFocus
              placeholder={t("header.feedback.placeholder")}
              className="resize-none h-[120px]"
              onChange={(evt) => setValue(evt.target.value)}
            />

            <div className="mt-1 flex items-center justify-end">
              <Button
                type="button"
                onClick={() => action.execute({ feedback: value })}
                disabled={value.length === 0 || action.status === "executing"}
              >
                {action.status === "executing" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t("header.feedback.send")
                )}
              </Button>
            </div>
          </form>
        )}
      </PopoverContent>
    </Popover>
  );
}

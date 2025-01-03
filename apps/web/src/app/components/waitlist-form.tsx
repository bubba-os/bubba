"use client";

import { waitlistSchema } from "@/app/actions/schema";
import { joinWaitlist } from "@/app/actions/waitlist";
import { Button } from "@bubba/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bubba/ui/form";
import { Input } from "@bubba/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function WaitlistForm() {
  const [isSent, setSent] = useState(false);

  const waitlistAction = useAction(joinWaitlist, {
    onSuccess: () => {
      setSent(true);
      toast.success("Please check your email for a confirmation link.");
      form.reset();
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof waitlistSchema>) => {
    waitlistAction.execute({
      email: data.email,
    });
  };

  if (isSent) {
    return (
      <div className="flex flex-col space-y-4">
        <span>Check your email for a confirmation link to continue.</span>
        <Button
          variant="outline"
          className="text-sm font-medium text-primary underline"
          onClick={() => setSent(false)}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  type="email"
                  placeholder="Enter your email"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex">
          <Button
            type="submit"
            disabled={waitlistAction.isExecuting || !form.formState.isValid}
          >
            {waitlistAction.isExecuting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Get Started <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

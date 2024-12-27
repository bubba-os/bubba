"use client";

import { waitlistSchema } from "@/app/actions/schema";
import { joinWaitlist } from "@/app/actions/waitlist";
import { Button } from "@bubba-beta/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bubba-beta/ui/form";
import { Input } from "@bubba-beta/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function WaitlistForm() {
  const waitlistAction = useAction(joinWaitlist, {
    onSuccess: () => {
      toast.success("Successfully joined the waitlist!");
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
            <div className="flex items-center justify-center">
              Join Waitlist
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}

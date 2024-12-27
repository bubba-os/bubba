"use client";

import { organizationSchema } from "@/actions/schema";
import { updateOrganizationAction } from "@/actions/update-organization-action";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function Onboarding() {
  const updateOrganization = useAction(updateOrganizationAction, {
    onSuccess: () => {
      toast.success("Thanks, you're all set!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      website: "",
    },
  });

  const onSubmit = (data: z.infer<typeof organizationSchema>) => {
    updateOrganization.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  className="mt-3"
                  placeholder="Your organization name"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  className="mt-3"
                  placeholder="Your website"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="w-full">
            <div className="flex items-center justify-center">
              Complete Onboarding
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}

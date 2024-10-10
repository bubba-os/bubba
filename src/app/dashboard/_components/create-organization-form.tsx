"use client";

import { createOrganizationAction } from "../_actions/create-organization-action";
import { createOrganizationSchema } from "../_actions/organization-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";

export function CreateOrganizationForm() {
  const createOrganization = useAction(createOrganizationAction);

  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof createOrganizationSchema>) {
    try {
      createOrganization.execute({
        name: values.name,
        redirectTo: "/dashboard/overview",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create organization");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoFocus
                  className="mt-3"
                  placeholder="Ex: Acme Marketing or Acme Co"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mt-6 w-full"
          type="submit"
          loading={
            createOrganization.status === "executing" ||
            createOrganization.status === "hasSucceeded"
          }
        >
          Next
        </Button>
      </form>
    </Form>
  );
}

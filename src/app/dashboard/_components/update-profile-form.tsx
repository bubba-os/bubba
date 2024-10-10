"use client";

import { updateProfileAction } from "../_actions/update-profile-action";
import { createProfileSchema } from "../_actions/profile-schema";
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
import React from "react";

export function UpdateProfileForm() {
  const updateProfile = useAction(updateProfileAction);

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof createProfileSchema>) {
    updateProfile.execute({
      name: values.name,
      redirectTo: "/dashboard",
    });
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
                  placeholder="John Doe"
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
            updateProfile.status === "executing" ||
            updateProfile.status === "hasSucceeded"
          }
        >
          Next
        </Button>
      </form>
    </Form>
  );
}

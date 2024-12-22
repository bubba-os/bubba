"use client";

import { updateOrganizationNameAction } from "@/actions/organization/update-organization-name-action";
import { organizationNameSchema } from "@/actions/schema";
import { Button } from "@bubba-beta/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bubba-beta/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bubba-beta/ui/form";
import { Input } from "@bubba-beta/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function UpdateOrganizationName({
  organizationName,
}: {
  organizationName: string;
}) {
  const updateOrganizationName = useAction(updateOrganizationNameAction, {
    onSuccess: () => {
      toast.success("Organization name updated");
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm<z.infer<typeof organizationNameSchema>>({
    resolver: zodResolver(organizationNameSchema),
    defaultValues: {
      name: organizationName,
    },
  });

  const onSubmit = (data: z.infer<typeof organizationNameSchema>) => {
    updateOrganizationName.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Organization Name</CardTitle>
            <CardDescription>
              This is your organizations visible name. You should use the legal
              name of your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="max-w-[300px]"
                      autoComplete="off"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck="false"
                      maxLength={32}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>{" "}
          <CardFooter className="flex justify-between">
            <div>Please use 32 characters at maximum.</div>
            <Button
              type="submit"
              disabled={updateOrganizationName.status === "executing"}
            >
              {updateOrganizationName.status === "executing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

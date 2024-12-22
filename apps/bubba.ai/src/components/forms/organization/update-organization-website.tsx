"use client";

import { updateOrganizationWebsiteAction } from "@/actions/organization/update-organization-website-action";
import { organizationWebsiteSchema } from "@/actions/schema";
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

interface UpdateOrganizationWebsiteProps {
  organizationWebsite: string;
}

export function UpdateOrganizationWebsite({
  organizationWebsite,
}: UpdateOrganizationWebsiteProps) {
  const updateOrganizationWebsite = useAction(updateOrganizationWebsiteAction, {
    onSuccess: () => {
      toast.success("Organization website updated");
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const form = useForm<z.infer<typeof organizationWebsiteSchema>>({
    resolver: zodResolver(organizationWebsiteSchema),
    defaultValues: {
      website: organizationWebsite,
    },
  });

  const onSubmit = (data: z.infer<typeof organizationWebsiteSchema>) => {
    updateOrganizationWebsite.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Organization Website</CardTitle>
            <CardDescription>
              This is your organization&apos;s official website URL. Make sure
              to include the full URL with https://.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="website"
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
                      placeholder="https://example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>Please enter a valid URL including https://</div>
            <Button
              type="submit"
              disabled={updateOrganizationWebsite.status === "executing"}
            >
              {updateOrganizationWebsite.status === "executing" ? (
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

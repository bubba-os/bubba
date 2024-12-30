"use client";

import { updateOrganizationWebsiteAction } from "@/actions/organization/update-organization-website-action";
import { organizationWebsiteSchema } from "@/actions/schema";
import { useI18n } from "@/locales/client";
import { Button } from "@bubba/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bubba/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bubba/ui/form";
import { Input } from "@bubba/ui/input";
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
  const t = useI18n();
  const updateOrganizationWebsite = useAction(updateOrganizationWebsiteAction, {
    onSuccess: () => {
      toast.success(t("settings.general.org_website_updated"));
    },
    onError: () => {
      toast.error(t("settings.general.org_website_error"));
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
            <CardTitle>{t("settings.general.org_website")}</CardTitle>
            <CardDescription>
              {t("settings.general.org_website_description")}
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
            <div>{t("settings.general.org_website_tip")}</div>
            <Button
              type="submit"
              disabled={updateOrganizationWebsite.status === "executing"}
            >
              {updateOrganizationWebsite.status === "executing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("settings.general.save_button")
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

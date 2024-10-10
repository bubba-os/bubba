"use client";

import { trustVaultSettingsAction } from "../_actions/trust-vault-settings-action";
import { trustVaultSettingsSchema } from "../_actions/trust-vault-settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TrustVaultSettingsForm({
  url,
  subdomain,
}: {
  url: string;
  subdomain: string | undefined;
  published: boolean;
}) {
  const trustVaultSettings = useAction(trustVaultSettingsAction, {
    onSuccess: () => {
      toast.success("Trust Vault settings updated");
    },
    onError: () => {
      toast.error(
        "Failed to update Trust Vault settings. Please try a different subdomain.",
      );

      form.reset({
        subdomain: subdomain ?? undefined,
      });
    },
  });

  const form = useForm<z.infer<typeof trustVaultSettingsSchema>>({
    resolver: zodResolver(trustVaultSettingsSchema),
    defaultValues: {
      subdomain: subdomain ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof trustVaultSettingsSchema>) {
    try {
      trustVaultSettings.execute({
        subdomain: values.subdomain,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create organization");
    }
  }

  return (
    <Card className="mt-6 w-full max-w-4xl">
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="subdomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trust Vault URL</FormLabel>
                    <FormControl>
                      <div className="flex flex-row">
                        <Input
                          autoFocus
                          className="rounded-r-none"
                          placeholder="subdomain"
                          autoCapitalize="off"
                          pattern="[a-zA-Z0-9\-]+"
                          maxLength={32}
                          required
                          {...field}
                        />
                        <div className="inline-flex items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                          {" "}
                          .{url}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <Button
              className="w-full"
              type="submit"
              loading={trustVaultSettings.status === "executing"}
            >
              Save Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

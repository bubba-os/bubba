"use client";

import { createVendorAction } from "../_actions/create-vendor-action";
import { createVendorSchema } from "../_actions/create-vendor-schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";
import { AssignUser } from "@/components/assign-user";
import { type User } from "next-auth";

enum VendorCategory {
  SOFTWARE = "SOFTWARE",
  SERVICE = "SERVICE",
  OTHER = "OTHER",
}

enum VendorRisk {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export function CreateVendorForm({ users }: { users: User[] }) {
  const createVendor = useAction(createVendorAction, {
    onError: () => {
      toast.error("There was an error creating the vendor");
    },
    onSuccess: () => {
      toast.success("Vendor created successfully");
    },
  });

  const categories = Object.values(VendorCategory);
  const risks = Object.values(VendorRisk);

  const form = useForm<z.infer<typeof createVendorSchema>>({
    resolver: zodResolver(createVendorSchema),
    defaultValues: {
      name: undefined,
      url: undefined,
      category: undefined,
      assignedTo: undefined,
      inherentRisk: undefined,
      redirectTo: "/dashboard/risk/vendor",
      contacts: undefined,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof createVendorSchema>) {
    createVendor.execute(values);
  }

  return (
    <Card className="mt-6 w-full max-w-4xl">
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme, Inc."
                        {...field}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        name="vendor-name"
                        id="vendor-name"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        name="vendor-url"
                        id="vendor-url"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category: VendorCategory) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To</FormLabel>
                    <FormControl>
                      <AssignUser
                        selectedId={field.value}
                        isLoading={false}
                        users={users.map((user) => ({
                          ...user,
                          name: user.name ?? "",
                          email: user.email ?? "",
                          image: user.image ?? "",
                        }))}
                        onSelect={(user: User | undefined) => {
                          field.onChange(user?.id);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inherentRisk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inherent Risk</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {risks.map((risk: VendorRisk) => (
                          <SelectItem key={risk} value={risk}>
                            {risk.charAt(0).toUpperCase() +
                              risk.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contacts.0.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name of contact"
                          {...field}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          name="poc-contact-name"
                          id="poc-contact-name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contacts.0.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contact email address"
                          {...field}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          name="poc-contact-email"
                          id="poc-contact-email"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          loading={
            createVendor.status === "executing" ||
            createVendor.status === "hasSucceeded"
          }
          disabled={
            createVendor.status === "executing" ||
            createVendor.status === "hasSucceeded"
          }
          onClick={form.handleSubmit(onSubmit)}
        >
          {createVendor.status === "executing"
            ? "Creating..."
            : createVendor.status === "hasSucceeded"
              ? "Created"
              : "Create Vendor"}
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { deleteOrganizationAction } from "@/actions/organization/delete-organization-action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@bubba/ui/alert-dialog";
import { Button } from "@bubba/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@bubba/ui/card";
import { Input } from "@bubba/ui/input";
import { Label } from "@bubba/ui/label";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteOrganization({
  organizationId,
}: {
  organizationId: string;
}) {
  const [value, setValue] = useState("");
  const deleteOrganization = useAction(deleteOrganizationAction, {
    onSuccess: () => {
      toast.success("Organization deleted");
      redirect("/");
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  return (
    <Card className="border-2 border-destructive">
      <CardHeader>
        <CardTitle>Delete organization</CardTitle>
        <CardDescription>
          Permanently remove your organization and all of its contents from the
          Bubba AI platform. This action is not reversible — please continue
          with caution.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="hover:bg-destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                organization and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="mt-2 flex flex-col gap-2">
              <Label htmlFor="confirm-delete">
                Type <span className="font-medium">DELETE</span> to confirm.
              </Label>
              <Input
                id="confirm-delete"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteOrganization.execute({
                    id: organizationId,
                    organizationId,
                  })
                }
                disabled={value !== "DELETE"}
              >
                {deleteOrganization.status === "executing" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

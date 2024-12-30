"use client";

import { deleteOrganizationAction } from "@/actions/organization/delete-organization-action";
import { useI18n } from "@/locales/client";
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
  const t = useI18n();
  const [value, setValue] = useState("");
  const deleteOrganization = useAction(deleteOrganizationAction, {
    onSuccess: () => {
      toast.success(t("settings.general.org_delete_success"));
      redirect("/");
    },
    onError: () => {
      toast.error(t("settings.general.org_delete_error"));
    },
  });

  return (
    <Card className="border-2 border-destructive">
      <CardHeader>
        <CardTitle>{t("settings.general.org_delete")}</CardTitle>
        <CardDescription>
          {t("settings.general.org_delete_description")}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="hover:bg-destructive">
              {t("settings.general.delete_button")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("settings.general.org_delete_alert_title")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("settings.general.org_delete_alert_description")}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="mt-2 flex flex-col gap-2">
              <Label htmlFor="confirm-delete">
                {t("settings.general.delete_confirm_tip")}
              </Label>
              <Input
                id="confirm-delete"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>
                {t("settings.general.cancel_button")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteOrganization.execute({
                    id: organizationId,
                    organizationId,
                  })
                }
                disabled={value !== t("settings.general.delete_confirm")}
              >
                {deleteOrganization.status === "executing" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t("settings.general.delete_confirm")
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

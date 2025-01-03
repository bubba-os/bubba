"use client";

import { useI18n } from "@/locales/client";
import { Button } from "@bubba/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@bubba/ui/drawer";
import { useMediaQuery } from "@bubba/ui/hooks";
import { ScrollArea } from "@bubba/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@bubba/ui/sheet";
import { X } from "lucide-react";
import { useQueryState } from "nuqs";

import type { Risk } from "@bubba/db";
import { CreateRiskCommentForm } from "../forms/risks/create-risk-comment-form";

export function RiskCommentSheet({
  risk,
}: {
  risk: Risk;
}) {
  const t = useI18n();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useQueryState("risk-comment-sheet");
  const isOpen = Boolean(open);

  const handleOpenChange = (open: boolean) => {
    setOpen(open ? "true" : null);
  };

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent stack>
          <SheetHeader className="mb-8">
            <div className="flex justify-between items-center flex-row">
              <SheetTitle>{t("risk.comments.title")}</SheetTitle>
              <Button
                size="icon"
                variant="ghost"
                className="p-0 m-0 size-auto hover:bg-transparent"
                onClick={() => setOpen(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>{" "}
            <SheetDescription>
              {t("risk.comments.description")}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-full p-0 pb-[100px]" hideScrollbar>
            <CreateRiskCommentForm />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTitle hidden>{t("risk.comments.title")}</DrawerTitle>
      <DrawerContent className="p-6">
        <CreateRiskCommentForm />
      </DrawerContent>
    </Drawer>
  );
}

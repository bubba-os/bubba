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
import { InherentRiskForm } from "../forms/risks/inherent-risk-form";

export function InherentRiskSheet({
  riskId,
  initialProbability,
  initialImpact,
  onSuccess,
}: {
  riskId: string;
  initialProbability?: number;
  initialImpact?: number;
  onSuccess?: () => void;
}) {
  const t = useI18n();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useQueryState("inherent-risk-sheet");
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
              <SheetTitle>{t("risk.form.update_inherent_risk")}</SheetTitle>
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
              {t("risk.form.update_inherent_risk_description")}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-full p-0 pb-[100px]" hideScrollbar>
            <InherentRiskForm
              riskId={riskId}
              initialProbability={initialProbability}
              initialImpact={initialImpact}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTitle hidden>{t("risk.form.update_inherent_risk")}</DrawerTitle>
      <DrawerContent className="p-6">
        <InherentRiskForm
          riskId={riskId}
          initialProbability={initialProbability}
          initialImpact={initialImpact}
        />
      </DrawerContent>
    </Drawer>
  );
}

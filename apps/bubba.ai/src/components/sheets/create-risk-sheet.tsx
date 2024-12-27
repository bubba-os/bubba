"use client";

import { Button } from "@bubba-beta/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@bubba-beta/ui/drawer";
import { useMediaQuery } from "@bubba-beta/ui/hooks";
import { ScrollArea } from "@bubba-beta/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@bubba-beta/ui/sheet";
import { X } from "lucide-react";
import { useQueryState } from "nuqs";
import { CreateRisk } from "../forms/risks/create-risk-form";

export function CreateRiskSheet() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useQueryState("create-risk-sheet");
  const isOpen = Boolean(open);

  const handleOpenChange = (open: boolean) => {
    setOpen(open ? "true" : null);
  };

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent stack>
          <SheetHeader className="mb-8 flex justify-between items-center flex-row">
            <SheetTitle>Create New Risk</SheetTitle>
            <Button
              size="icon"
              variant="ghost"
              className="p-0 m-0 size-auto hover:bg-transparent"
              onClick={() => setOpen(null)}
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetHeader>

          <ScrollArea className="h-full p-0 pb-[100px]" hideScrollbar>
            <CreateRisk />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTitle hidden>Create Risk</DrawerTitle>
      <DrawerContent className="p-6">
        <CreateRisk />
      </DrawerContent>
    </Drawer>
  );
}

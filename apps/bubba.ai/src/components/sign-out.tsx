"use client";

import { useI18n } from "@/locales/client";
import { DropdownMenuItem } from "@bubba/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function SignOut() {
  const t = useI18n();
  const [isLoading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      {isLoading ? "Loading..." : t("user_menu.sign_out")}
    </DropdownMenuItem>
  );
}

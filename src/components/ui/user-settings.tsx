"use client";

import { SignOut } from "./sign-out";
import { ChevronsUpDown, User2Icon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeSwitch } from "./theme-switch";
import React from "react";
import { type Session } from "next-auth";

export default function UserSettingsDropdown({
  session,
}: {
  session: Session;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = session.user;

  const nameInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="group flex cursor-pointer select-none items-center gap-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback>
                {nameInitials ?? <User2Icon size={16} />}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              {user?.name && (
                <div className="line-clamp-1 break-all text-xs font-bold">
                  {user.name}
                </div>
              )}
              {user?.email && (
                <div className="line-clamp-1 break-all text-xs">
                  {user.email}
                </div>
              )}
            </div>
          </div>
        </DropdownMenuTrigger>
        {isDropdownOpen && (
          <DropdownMenuContent className="mx-4 min-w-[220px]">
            {user?.name && <DropdownMenuLabel>{user.name}</DropdownMenuLabel>}
            <DropdownMenuLabel className="text-xs font-light text-muted-foreground">
              {user?.orgName}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs font-light text-muted-foreground">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-1">
              <ThemeSwitch />
              <SignOut />
            </div>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}

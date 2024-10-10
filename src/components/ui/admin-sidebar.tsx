"use client";

import {
  Home,
  File,
  FileWarning,
  PlusIcon,
  Boxes,
  FileSearch2,
} from "lucide-react";
import { type Session } from "next-auth";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import Logo from "./navbar-logo";
import { AdminSidenavOption } from "./admin-sidenav-option";
import { AdminSidenavSubOption } from "./admin-sidenav-suboption";

import UserSettings from "./user-settings";

type TopLevelOptions = {
  segment: string;
  label: string;
  href: string;
  icon: JSX.Element;
  beta?: boolean;
  hidden?: boolean;
  subOptions?: SubOption[];
};

type SubOption = {
  segment: string;
  label: string;
  href: string;
  beta?: boolean;
  hidden?: boolean;
  icon: JSX.Element;
};

export default function AdminSidenav({ session }: { session: Session }) {
  const pathname = usePathname();

  const basePath = `/dashboard`;

  const options: TopLevelOptions[] = [
    {
      segment: "overview",
      label: "Overview",
      href: `${basePath}/overview`,
      icon: <Home size={15} />,
    },
    {
      segment: "policies",
      label: "Policies",
      href: `${basePath}/policies/`,
      icon: <FileSearch2 size={15} />,
    },
    {
      segment: "risk",
      label: "Risk Management",
      href: `${basePath}/risk`,
      icon: <FileWarning size={15} />,
      subOptions: [
        {
          segment: "vendor",
          label: "Vendors",
          href: `${basePath}/risk/vendor`,
          icon: <Boxes size={15} />,
        },
      ],
    },
  ];

  const normalizePath = (path: string) => path.replace(/\/$/, ""); // Remove trailing slash

  return (
    <div className="hidden h-full w-60 select-none flex-col border-r bg-popover p-4 text-popover-foreground shadow-lg shadow-muted lg:flex">
      <Logo width={50} height={35} />
      <div className="mt-4 flex flex-grow flex-col gap-2">
        {options
          .filter((option) => !option.hidden)
          .map((option) => {
            const isExactMatchTopLevel =
              normalizePath(pathname) === normalizePath(option.href);
            return (
              <div key={option.segment} className="flex flex-col gap-2">
                <AdminSidenavOption
                  isActive={isExactMatchTopLevel}
                  label={option.label}
                  href={option.href}
                  icon={option.icon}
                  beta={option.beta}
                />
                {option.subOptions?.map((subOption) => (
                  <AdminSidenavSubOption
                    key={subOption.segment}
                    isActive={normalizePath(pathname).startsWith(
                      normalizePath(subOption.href),
                    )}
                    {...subOption}
                  />
                ))}
              </div>
            );
          })}
      </div>
      <UserSettings session={session} />
    </div>
  );
}

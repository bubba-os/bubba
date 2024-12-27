"use client";

import { cn } from "@bubba-beta/ui/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SecondaryMenuProps {
  items: { path: string; label: string; query?: Record<string, string> }[];
  isChild?: boolean;
}

export function SecondaryMenu({ items, isChild }: SecondaryMenuProps) {
  const pathname = usePathname();

  function getPathSegments(path: string) {
    return path.split("/").filter(Boolean);
  }

  function isActiveLink(itemPath: string) {
    const currentSegments = getPathSegments(pathname);
    const itemSegments = getPathSegments(itemPath);

    const segmentsToCompare = currentSegments.slice(0, 2);

    return (
      segmentsToCompare.length === itemSegments.length &&
      itemSegments.every((segment, i) => segment === segmentsToCompare[i])
    );
  }

  return (
    <nav className={cn(isChild ? "py-0" : "py-4")}>
      <ul
        className={cn(
          "scrollbar-hide flex overflow-auto text-sm",
          isChild ? "space-x-3" : "space-x-6",
        )}
      >
        {items.map((item) => (
          <Link
            prefetch
            key={item.path}
            href={{
              pathname: item.path,
            }}
            className={cn(
              "text-muted-foreground",
              isActiveLink(item.path) &&
                "font-medium text-primary underline underline-offset-8",
            )}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

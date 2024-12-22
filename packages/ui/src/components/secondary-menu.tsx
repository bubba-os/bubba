"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../utils/cn";

interface SecondaryMenuProps {
  items: { path: string; label: string }[];
}

export function SecondaryMenu({ items }: SecondaryMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="py-4">
      <ul className="scrollbar-hide flex space-x-6 overflow-auto text-sm">
        {items.map((item) => (
          <Link
            prefetch
            key={item.path}
            href={item.path}
            className={cn(
              "text-muted-foreground",
              pathname === item.path &&
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

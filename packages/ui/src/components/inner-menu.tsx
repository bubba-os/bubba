import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface InnerMenuProps {
  title: string;
  previous: string;
}

export function InnerMenu({ title, previous }: InnerMenuProps) {
  return (
    <nav className="py-4">
      <ul className="scrollbar-hide flex overflow-auto text-sm space-x-3 items-center">
        <li>
          <Link href={previous}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </li>
        <li>
          <span className="font-medium text-primary underline underline-offset-8">
            {title}
          </span>
        </li>
      </ul>
    </nav>
  );
}

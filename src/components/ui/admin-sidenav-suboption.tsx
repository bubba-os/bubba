import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ISidenavOption {
  label: string;
  href: string;
  isActive: boolean;
  beta?: boolean;
  icon: JSX.Element;
}

export function AdminSidenavSubOption(props: ISidenavOption) {
  return (
    <Link href={props.href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2",
          props.isActive && "bg-muted-foreground/10 text-primary",
        )}
      >
        <div className="w-2"></div>
        {props.icon}
        {props.label}
      </Button>
    </Link>
  );
}

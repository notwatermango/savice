import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

interface ToolsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export default function ToolsNav({ items }: ToolsNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
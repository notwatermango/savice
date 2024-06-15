import { Brain } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "~/config/site";
import { ComboboxForm } from "./ComboboxLanguage";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { usePathname } from "next/navigation";

export default function TopBar({
  lang,
  items,
}: {
  lang: string;
  items: {
    href: string;
    title: string;
  }[];
}) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Brain size={36} />
            <span className="hidden text-xl font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname.endsWith(item.href)
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start",
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <ComboboxForm lang={lang} />
      </div>
    </header>
  );
}

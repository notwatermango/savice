import { Brain } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "~/config/site";
import { ComboboxForm } from "./ComboboxLanguage";

export default function TopBar({ lang }: { lang: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Brain size={36} />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <ComboboxForm lang={lang} />
      </div>
    </header>
  );
}

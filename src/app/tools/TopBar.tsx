import { Brain } from "lucide-react";
import Link from "next/link";
import React from "react";
import { siteConfig } from "~/config/site";

const TopBar: React.FC = () => {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Brain size={36} />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default TopBar;

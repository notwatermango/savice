import { ComboboxForm } from "./ComboboxLanguage";
import Image from "next/image";

export default function TopBar({
  lang,
}: {
  lang: string;
  items: {
    href: string;
    title: string;
  }[];
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex">
          <Image
            src="https://i.ibb.co.com/RgTrb9p/SAVICE-g4.png"
            alt="Logo"
            width={182}
            height={48}
            className="mr-6 flex items-center space-x-2"
          />
        </div>
        <ComboboxForm lang={lang} />
      </div>
    </header>
  );
}

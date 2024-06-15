"use client";

import "~/styles/globals.css";

import ToolsNav from "./ToolsNav";
import TopBar from "./TopBar";

const toolsNavItems = {
  items: [
    { href: "/tools", title: "Tools" },
    { href: "/tools/summarize", title: "Summarize" },
  ],
};

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <TopBar lang={lang} />
      <main className="container relative z-20 mx-auto pt-2">
        <ToolsNav items={toolsNavItems.items} />
        {children}
      </main>
    </>
  );
}

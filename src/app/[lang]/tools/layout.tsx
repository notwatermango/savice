"use client";

import "~/styles/globals.css";

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
      <TopBar lang={lang} items={toolsNavItems.items} />
      <main className="container relative z-20 mx-auto pt-2">{children}</main>
    </>
  );
}

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { siteConfig } from "~/config/site";
import { ThemeProvider } from "~/components/theme-provider";
import { dir } from "i18next";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
import { Toaster } from "~/components/ui/toaster";

const languages = ["en", "de"];

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html dir={dir(lang)} lang={lang} className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="theme-custom"
          forcedTheme="theme-custom"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

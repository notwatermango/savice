import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { siteConfig } from "~/config/site";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
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
        </ThemeProvider>
      </body>
    </html>
  );
}

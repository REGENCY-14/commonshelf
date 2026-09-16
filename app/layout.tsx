import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/catalog/SiteHeader";
import { SiteFooter } from "@/components/catalog/SiteFooter";
import { PageTransition } from "@/components/PageTransition";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Common Shelf: Find the edition worth reading",
  description:
    "A curated digital library catalog linking legitimate, beautifully formatted public-domain editions from Project Gutenberg, Standard Ebooks, and the Internet Archive.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg-canvas font-sans text-text-primary">
        <SiteHeader />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "G.Ark";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: { default: siteName, template: `%s | ${siteName}` }, description: "A minimal personal website with blog, thoughts, search, comments, and admin publishing." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN" suppressHydrationWarning><body><ThemeProvider><SiteHeader />{children}<SiteFooter /></ThemeProvider></body></html>;
}

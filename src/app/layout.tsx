// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import LiveChat from "@/components/LiveChat";
import PageCurtain from "@/components/PageCurtain";
const brand = Montserrat({
  subsets: ["latin"],
  weight: ["300","400","600","700","800"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fluenciaga Publishing",
  description: "Premium PR & Publishing Services - Fluenciaga Publishing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/logo.png" sizes="32x32" /></head>
      <body className={brand.variable}>
        <PageCurtain />
        <LiveChat />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

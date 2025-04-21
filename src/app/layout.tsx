"use client";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import './globals.css'
const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#f8fafc] text-[#1e293b]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

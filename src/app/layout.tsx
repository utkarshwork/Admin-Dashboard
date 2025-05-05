"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import ThemeProviderWrapper from "./theme-provider";
import { useEffect, useState } from "react";
import Loader from "@/components/layout/loader/Loader";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <body suppressHydrationWarning={true}>
        <ThemeProviderWrapper>
          {loading ? <Loader /> : children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

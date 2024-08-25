import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

import { cn } from "@/lib/utils";
import { Providers, ThemeProvider } from "@/components/Providers";
import { inter, satoshi } from "@/styles/fonts";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "100xQuest",
  description: "Aptitude test to select 30individuals to be mentored by Harkirat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(satoshi.variable, inter.variable)}>
        {/* TODO: Check this is not working */}
        <NextTopLoader color="#FF0000" height={4} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}

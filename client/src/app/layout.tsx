import type { Metadata } from "next";
import "./globals.css";
import { lato } from "./font";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "RBCL",
  description: "Best E-commerce platform in BD",
};

import { Playfair_Display, Roboto } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.className} antialiased`}>
        <NextTopLoader showSpinner={false} color="[#008080]" />
        {children}
      </body>
    </html>
  );
}

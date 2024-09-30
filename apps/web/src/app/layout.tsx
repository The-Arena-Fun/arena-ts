import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { NavHeader } from "@/components/atoms/Nav/NavHeader";
import { Providers } from "@/contexts/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const protoMono = localFont({
  src: "./fonts/ProtoMono-Regular.woff",
  variable: "--font-proto-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Arena",
  description: "Trading re-imagined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${protoMono.variable} antialiased min-h-screen flex flex-col font-[family-name:var(--font-proto-mono)]`}
      >
        <Providers>
          <NavHeader />
          <div className="w-full flex flex-1 justify-center">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

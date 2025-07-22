import type { Metadata } from "next";
import { Exo_2, MuseoModerno } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "@/_components/client/layout/ProvidersWrapper";
import { appName } from "@/_library/const/brand-assets";
import Head from "next/head";

const geistSans = MuseoModerno({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "variable"
});

const geistMono = Exo_2({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "variable"
});

export const metadata: Metadata = {
  title: `${appName}`,
  description: "The Lead Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <Head>
        <link
          rel="preload"
          as="fetch"
          href="https://lottie.host/4f9b1180-3129-4d0c-b034-0c80662febbb/5PPP8zAgEi.lottie"
          crossOrigin="anonymous"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersWrapper>
          {children}
        </ProvidersWrapper>

      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Exo_2, Geist, Geist_Mono, MuseoModerno } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "@/_components/client/layout/ProvidersWrapper";
import { appName } from "@/_library/const/brand-assets";

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

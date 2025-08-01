import type { Metadata } from "next";
import { Exo_2, MuseoModerno } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "@/_components/client/layout/ProvidersWrapper";
import { appName } from "@/_library/const/brand-assets";
import Head from "next/head";
import PearlBoxGlobalNav from "@/_components/client/layout/navbar/PealBoxGlobalNav";
import GlassFooter from "@/_components/client/layout/footer/Footer";

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
  title: `${appName} | AI-Powered SaaS for Intuitive Innovation & Business Automation`,
  description:
    "Pearl Box delivers AI-powered SaaS solutions that simplify complexity and fuel creative innovation. We build intuitive, intelligent systems that optimize workflows, automate growth, and empower modern businesses.",
  keywords: [
    "Pearl Box",
    "AI SaaS platform",
    "intuitive automation",
    "business optimization",
    "workflow simplification",
    "creative software solutions",
    "innovative tech tools",
    "intelligent systems",
    "business automation platform",
    "tech for startups",
    "AI-powered tools",
    "scalable software",
    "digital transformation",
  ],
  openGraph: {
    title: `${appName} | AI-Powered SaaS for Intuitive Innovation & Business Automation`,
    description:
      "Unlock intuitive innovation with Pearl Box—AI-powered SaaS that simplifies complexity, automates operations, and inspires creative growth.",
    type: "website",
    url: "https://www.pearlbox.co",
    siteName: "Pearl Box",
    images: [
      {
        url: "https://res.cloudinary.com/dyfhsjtwo/image/upload/v1753478226/Untitled_design_3_lk8scr.webp",
        width: 1200,
        height: 630,
        alt: "Pearl Box | Simplify. Automate. Innovate.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} | Simplify. Automate. Innovate.`,
    description:
      "Pearl Box is the AI-powered SaaS platform built for intuitive innovation. Eliminate complexity. Empower creativity. Grow intelligently.",
    images: ["https://res.cloudinary.com/dyfhsjtwo/image/upload/v1753478226/Untitled_design_3_lk8scr.webp"],
  },
  metadataBase: new URL("https://www.pearlbox.co"),
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
          <PearlBoxGlobalNav />
          {children}
          <GlassFooter />
        </ProvidersWrapper>

      </body>
    </html>
  );
}

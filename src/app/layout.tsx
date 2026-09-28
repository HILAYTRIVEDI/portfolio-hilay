import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Hilay Trivedi | AI Systems Engineer & WordPress Core Contributor",
  description:
    "AI systems engineer building governed multi-agent systems, agent memory, and AI security tooling in production. 5.5+ years at enterprise scale. WordPress Core contributor.",
  keywords: [
    "AI Systems Engineer",
    "Multi-Agent Systems",
    "Agent Memory",
    "AI Security",
    "GraphRAG",
    "LangGraph",
    "MCP",
    "WordPress Core Contributor",
    "WordPress VIP",
    "Forward Deployed Engineer",
  ],
  authors: [{ name: "Hilay Trivedi" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Hilay Trivedi | AI Systems Engineer & WordPress Core Contributor",
    description:
      "AI systems engineer building governed multi-agent systems, agent memory, and AI security tooling in production. 5.5+ years at enterprise scale. WordPress Core contributor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full">
        <a href="#hero" className="skip-link">Skip to content</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hilay Trivedi — Senior WordPress & PHP Engineer",
  description:
    "Senior WordPress & PHP Engineer with 5+ years building enterprise-grade solutions on WordPress VIP. WordPress Core contributor. Specialising in custom plugins, headless CMS, Gutenberg/FSE, and full-stack AI projects.",
  keywords: [
    "WordPress VIP",
    "PHP Engineer",
    "Senior Developer",
    "Gutenberg",
    "Next.js",
    "React",
    "WordPress Core Contributor",
    "Headless WordPress",
    "rtCamp",
  ],
  authors: [{ name: "Hilay Trivedi" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Hilay Trivedi — Senior WordPress & PHP Engineer",
    description:
      "Enterprise WordPress, headless CMS, AI projects, and open source contributions.",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}

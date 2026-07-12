import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nguyen-portfolio.com"),
  title: "Nguyen's portfolio",
  description:
    "An interactive, macOS-inspired portfolio of my product work and the things I've built.",
  openGraph: {
    title: "Nguyen's portfolio",
    description:
      "An interactive, macOS-inspired portfolio of my product work and the things I've built.",
    url: "/",
    siteName: "Nguyen's portfolio",
    type: "website",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Nguyen's portfolio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen's portfolio",
    description:
      "An interactive, macOS-inspired portfolio of my product work and the things I've built.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance App",
  description: "This is a finance app built with Next.js",
  keywords: "finance, nextjs, app",
  authors: [{ name: "Peh", url: "https://example.com" }],
  creator: "Jos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  );
}

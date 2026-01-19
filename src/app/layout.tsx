import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guestbook - Windows 98",
  description: "A retro Windows 98 themed guestbook application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

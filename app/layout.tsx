import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Quotebook",
  description: "Quotes baby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-[100vh] items-center justify-center">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "../components/AuthProvider";

export const metadata: Metadata = {
  title: "QBank Platform – AI-Powered Question Bank",
  description: "AI-powered question bank for medical licensing exam preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

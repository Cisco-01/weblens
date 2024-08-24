import type { Metadata } from "next";
import { Architects_Daughter } from "next/font/google";
import "./globals.css";

const inter = Architects_Daughter({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Web Lens",
  description: "Take snapshots with your current camera quality and save them in .PNG 🤳 Or record videos on any of your devices 📹 All in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

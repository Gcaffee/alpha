import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpha Aircraft Systems &#8211; APU Overhauling Expert for aircraft APU repair, maintenance, fuel systems, hydraulic, plasma spray and professional welding",
  description:
    "Strategic design partner to bold digital brands.",
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
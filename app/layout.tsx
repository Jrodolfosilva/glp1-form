import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const redHatText = Red_Hat_Text({
  variable: "--font-red-hat-text",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HD VITA",
  description: "Emagrecimento e Longevidade ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={`${redHatDisplay.variable} ${redHatText.variable} h-full antialiased`}>
  <body className={`${redHatDisplay.variable} ${redHatText.variable} min-h-full flex flex-col font-sans pb-20 bg-gray-50 px-4 sm:px-6 lg:px-8`}>
    {children}
  </body>
</html>
  );
}

import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

const red = Red_Hat_Display({
  variable: "--font-red-hat", // nome da CSS variable
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "HD VITA",
  description: "Emagrecimento e Longevidade ",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br" className={`${red.variable} h-full antialiased`} >
      <body className={`${red.variable} min-h-full flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
}

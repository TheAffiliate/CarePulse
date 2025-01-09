import type { Metadata } from "next";
import Plus_Jakarta_Sans from "next/font/local";
import "./globals.css";
import {cn} from '@/lib/utils'
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "300 400 500 600 700",
});

const geistMono = Plus_Jakarta_Sans({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
 
export const metadata: Metadata = {
  title: "MedixHub",
  description: "Your Go To Health Crae Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={ cn (`min-h-screen bg-dark-300 font-sans antialiased`, fontSans.variable)}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

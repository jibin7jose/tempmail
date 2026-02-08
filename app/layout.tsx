import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TempMailo - Premium Temporary Email Service",
  description: "Generate disposable email addresses instantly. Protect your privacy and keep your inbox clean from spam.",
  keywords: "temporary email, disposable email, temp mail, private email, spam protection",
};

import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider>
          <div className="bg-glow"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

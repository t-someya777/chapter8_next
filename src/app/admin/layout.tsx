'use client'

import localFont from "next/font/local";
import "../globals.css";
import styles from "./layout.module.scss";
import Nav from "../_components/Nav";
import { useRouteGuard } from "../_hooks/useRouteGuard";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useRouteGuard()

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className={styles.container}>
        <Nav />
        <main className={styles.main}>
          {children}
        </main>
      </div>
      </body>
    </html>
  );
}

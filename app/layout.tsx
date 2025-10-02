import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "شركة المناسبات الدولية",
  description: "نحول أحلامك إلى واقع مبهر - خدمات تنظيم المناسبات والفعاليات",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}

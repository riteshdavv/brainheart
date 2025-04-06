import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NotificationProvider } from "@/components/ui/notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BrainHeart - ECG & EEG Signal Analysis Platform",
  description: "Advanced platform for ECG and EEG signal processing and analysis",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NotificationProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}



import './globals.css'
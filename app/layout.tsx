import "@/app/styles/globals.css"
import { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/app/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Dashboard Arduus",
    template: "%s | Dashboard Arduus",
  },
  description: "Plataforma de análise e gestão de receita da Arduus",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
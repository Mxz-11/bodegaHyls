import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Providers } from "./providers" // 👈 usamos nuestro nuevo wrapper

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bodega Valenciano",
  description: "Descubre nuestra bodega, nuestros vinos y nuestra historia",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={playfair.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

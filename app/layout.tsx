import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin", "hebrew"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "סטודיו סשה Tattoos — אומנות קעקועים",
  description: "סטודיו ביחס אישי ועבודה מדויקת",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Script
          src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
          strategy="lazyOnload"
        />
        <Script
          id="shapo-embed-js"
          type="text/javascript"
          src="https://cdn.shapo.io/js/embed.js"
          defer
        />
        <Script
          id="gtranslate-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.gtranslateSettings = {"default_language":"he","url_structure":"sub_directory","languages":["he","en","fr","it","es","ru"],"wrapper_selector":".gtranslate_wrapper"}`,
          }}
        />
        <Script
          src="https://cdn.gtranslate.net/widgets/latest/fn.js"
          strategy="lazyOnload"
          defer
        />
      </body>
    </html>
  )
}

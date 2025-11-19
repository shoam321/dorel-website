import type React from "react"
import { languages } from "@/lib/languages"

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({
    lang,
  }))
}

export default function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params.lang
  const langInfo = languages[lang as keyof typeof languages] || languages.en

  return (
    <html lang={lang} dir={langInfo.dir}>
      <body>{children}</body>
    </html>
  )
}

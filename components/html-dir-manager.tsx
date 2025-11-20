"use client"

import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function HtmlDirManager() {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (typeof window === "undefined") return

    // 1) Read from URL first segment and sync i18n if needed
    const supported = ["he", "en", "es", "ru", "ar", "th"] as const
    const seg = window.location.pathname.split("/").filter(Boolean)[0]
    if (seg && supported.includes(seg as any) && seg !== i18n.language) {
      i18n.changeLanguage(seg)
      localStorage.setItem("i18nextLng", seg)
      localStorage.setItem("gtranslate_language", seg)
    }

    // 2) Ensure html lang/dir reflect current i18n language
    const lang = i18n.language || localStorage.getItem("i18nextLng") || "he"
    const dir = lang === "he" || lang === "ar" ? "rtl" : "ltr"
    const el = document.documentElement
    el.setAttribute("lang", lang)
    el.setAttribute("dir", dir)
  }, [i18n.language, i18n])

  return null
}

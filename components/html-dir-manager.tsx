"use client"

import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function HtmlDirManager() {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (typeof window === "undefined") return
    // Ensure html lang/dir reflect current i18n language only (no URL -> i18n sync)
    const lang = i18n.language || localStorage.getItem("i18nextLng") || "he"
    const dir = lang === "he" || lang === "ar" ? "rtl" : "ltr"
    const el = document.documentElement
    el.setAttribute("lang", lang)
    el.setAttribute("dir", dir)
  }, [i18n.language, i18n])

  return null
}

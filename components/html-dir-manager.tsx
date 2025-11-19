"use client"

import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function HtmlDirManager() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language || (typeof window !== "undefined" && localStorage.getItem("gtranslate_language")) || "he"
    const dir = lang === "he" || lang === "ar" ? "rtl" : "ltr"
    const el = document.documentElement
    el.setAttribute("lang", lang)
    el.setAttribute("dir", dir)
  }, [i18n.language])

  return null
}

"use client"

import { useEffect, useState } from "react"

interface LanguageOption {
  code: string
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
]

export default function LanguagePicker() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Get current language from URL or localStorage
    const urlLang = window.location.pathname.split("/")[1]
    if (urlLang && languages.some((l) => l.code === urlLang)) {
      setCurrentLanguage(urlLang)
    } else {
      const storedLang = localStorage.getItem("gtranslate_language") || "en"
      setCurrentLanguage(storedLang)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    localStorage.setItem("gtranslate_language", langCode)
    setIsOpen(false)

    // Trigger Google Translate
    const event = new Event("gtranslate_element_on_change")
    window.dispatchEvent(event)

    // Navigate to language-specific URL
    if (langCode === "en") {
      window.location.href = "/"
    } else {
      window.location.href = `/${langCode}/`
    }
  }

  const currentLangObj = languages.find((l) => l.code === currentLanguage)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-black/60 hover:bg-black/70 border border-zinc-700 text-white shadow-md hover:shadow-lg transition-all duration-150"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLangObj?.flag}</span>
        <span className="text-xs sm:text-sm font-medium">{currentLangObj?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black/90 border border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-colors ${
                currentLanguage === lang.code
                  ? "bg-red-600/80 text-white"
                  : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

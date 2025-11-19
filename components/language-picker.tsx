"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"

interface LanguageOption {
  code: string
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: "he", name: "עברית", flag: "🇮🇱" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
]

interface LanguagePickerProps {
  currentLang?: string
}

export default function LanguagePicker({ currentLang = "he" }: LanguagePickerProps) {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    localStorage.setItem("gtranslate_language", langCode)
    setIsOpen(false)
  }

  const currentLangObj = languages.find((l) => l.code === i18n.language)

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
                i18n.language === lang.code
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

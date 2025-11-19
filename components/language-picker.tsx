"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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

interface LanguagePickerProps {
  currentLang?: string
}

export default function LanguagePicker({ currentLang = "en" }: LanguagePickerProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState(currentLang)

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode)
    setIsOpen(false)
    localStorage.setItem("gtranslate_language", langCode)
    
    // Navigate to the language route
    if (langCode === "en") {
      router.push("/en")
    } else {
      router.push(`/${langCode}`)
    }
  }

  const currentLangObj = languages.find((l) => l.code === selectedLang)

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
                selectedLang === lang.code
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

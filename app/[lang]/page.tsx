"use client"

import { useRef } from "react"
import { useState } from "react"
import Toast from "@/components/toast"
import RatingDialog from "@/components/rating-dialog"
import PortfolioCarousel from "@/components/portfolio-carousel"
import LanguagePicker from "@/components/language-picker"
import Image from "next/image"
import { translations, languages } from "@/lib/languages"

interface PageProps {
  params: {
    lang?: string
  }
}

export default function LanguagePage({ params }: PageProps) {
  const lang = (params.lang as keyof typeof translations) || "en"
  const t = translations[lang]
  const langInfo = languages[lang]
  const dir = langInfo?.dir || "ltr"

  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const ratingDialogRef = useRef<HTMLDialogElement>(null)

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRatingComplete = (avg: number) => {
    showToastMessage(t.ratingComplete)
    if (avg > 4) {
      setTimeout(() => {
        window.open(
          "https://www.google.com/search?q=sasha+tattoo+studio+tiberias",
          "_blank",
        )
      }, 1000)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: "Studio Sasha Tattoos",
      text: `Check out ${t.title}!`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (e) {
        // User cancelled share
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url)
        showToastMessage(t.linkCopied)
      } catch (e) {
        showToastMessage(t.copyFailed)
      }
    } else {
      showToastMessage(t.shareNotSupported)
    }
  }

  const handleRatingClick = () => {
    ratingDialogRef.current?.showModal()
  }

  return (
    <div
      className="min-h-dvh flex flex-col relative bg-cover bg-center"
      style={{ backgroundImage: "url(/images/mandala-background.jpg)" }}
      dir={dir}
      lang={lang}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

      {/* Language Picker */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <LanguagePicker currentLang={lang} />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-start py-6 sm:py-8">
        <div className="w-[min(420px,92vw)] bg-black/45 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex justify-center pt-6 pb-2">
            <div className="relative w-[138px] h-[138px]">
              <Image
                src="/images/studio-logo.png"
                alt={`${t.title} Logo`}
                width={138}
                height={138}
                className="drop-shadow-lg"
                style={{ clipPath: "circle(40% at 50% 50%)" }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="px-[18px] py-4">
            <h1 className="text-center font-bold text-2xl sm:text-3xl m-0 mb-2.5 text-white tracking-wide">
              {t.title}
            </h1>
            <p className="text-center text-sm text-zinc-300 opacity-90 m-0 mb-1">{t.subtitle}</p>
            <p className="text-center text-sm text-zinc-400 opacity-90 m-0 mb-1">{t.location}</p>
            <p className="text-center text-base font-semibold text-red-400 m-0 mb-3.5 tracking-wider">{t.phone}</p>
          </div>

          <div className="grid gap-2.5 px-4 pb-3.5 sm:grid-cols-2">
            <button
              onClick={handleRatingClick}
              className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-900/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150"
            >
              {t.rateUs}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2.5 border border-zinc-700 rounded-full px-4.5 py-3.5 font-bold bg-zinc-900/80 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150"
            >
              {t.shareWithFriend}
            </button>
          </div>

          {/* Social media buttons section */}
          <div className="px-4 py-3">
            <div className="flex justify-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100005352488791"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1877F2] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tattoobysashas?igsh=bGhnYTE0Z3pmZHF5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  <circle cx="18" cy="6" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@tattoobysashas?_r=1&_t=ZS-91JObky2tWx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
              <a
                href="https://wa.me/972526202701"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.173-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Portfolio Carousel Section */}
        <div className="w-[min(420px,92vw)] mt-6 sm:mt-8">
          <div className="bg-black/45 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-4">
            <h2 className="text-center font-bold text-xl sm:text-2xl mb-4 text-white tracking-wide">
              {t.portfolio}
            </h2>
            <PortfolioCarousel />
          </div>
        </div>

        {/* Shapo Widget Section */}
        <div className="w-[min(420px,92vw)] mt-6 sm:mt-8">
          <div className="bg-black/30 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-4">
            <div id="shapo-widget-878653ba3bbe62a9a2c1"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black/80 backdrop-blur-md border-t border-zinc-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src="/images/studio-logo.png"
                  alt={`${t.title} Logo`}
                  width={60}
                  height={60}
                  className="drop-shadow-lg"
                  style={{ clipPath: "circle(40% at 50% 50%)" }}
                />
              </div>
            </div>

            {/* Contact Info Section */}
            <div className={`text-center ${dir === 'rtl' ? 'sm:text-right' : 'sm:text-left'} flex-grow`}>
              <p className="text-white font-semibold text-sm sm:text-base m-0 mb-1">{t.title}</p>
              <p className="text-zinc-300 text-xs sm:text-sm m-0 mb-0.5">{t.address}</p>
              <p className="text-zinc-300 text-xs sm:text-sm m-0">{t.phone}</p>
            </div>

            {/* Copyright Section */}
            <div className={`text-center ${dir === 'rtl' ? 'sm:text-left' : 'sm:text-right'} flex-grow sm:flex-grow-0`}>
              <p className="text-zinc-500 text-xs m-0 mb-1">{t.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
              <p className="text-zinc-600 text-[10px] m-0">{t.allRightsReserved}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <Toast message={toastMessage} isVisible={showToast} />

      {/* Rating Dialog */}
      <RatingDialog ref={ratingDialogRef} onComplete={handleRatingComplete} />
    </div>
  )
}

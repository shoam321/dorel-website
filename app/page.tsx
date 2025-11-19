"use client"

import { useRef } from "react"

import { useState } from "react"
import Toast from "@/components/toast"
import RatingDialog from "@/components/rating-dialog"
import PortfolioCarousel from "@/components/portfolio-carousel"
import Image from "next/image"

export default function Home() {
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const ratingDialogRef = useRef<HTMLDialogElement>(null)

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRatingComplete = (avg: number) => {
    showToastMessage("תודה רבה, דעתך חשובה לנו")
    if (avg > 4) {
      setTimeout(() => {
        window.open(
          "https://www.google.com/search?sca_esv=c561dc4e372ce7af&authuser=5&q=%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA+%D7%A2%D7%9C+%D7%A1%D7%A9%D7%94+%D7%A7%D7%A2%D7%A7%D7%95%D7%A2%D7%99%D7%9D+%D7%98%D7%91%D7%A8%D7%99%D7%94&uds=AOm0WdH0fYjRTDJtHdu80X66xkxbNbmzTrfG4FXjirtOmRRwZRvSyNiJAP4C0fC3x8xRCy17FzJiA1vAxg0Qn2nezyy5gn0yWAhOuUiZwYry0DYQ-J7yCFBskMewGTOuiuUdWJqQ9WXNF9jDDBPJOr5fu4a0HznYOL_RTQHfx6JXvavTqwwj2n2gqc14fsOM9fOQVDr56hH5H3Dp_-qPy-Eqkkg-qYtUPzUEYHPQOmtTiiiptvVRFX0qZt0tp4DfpMeEN1OufkPREJiJrQ1rOtQispWOFk0sERfVsLkrsiLwTsMcFHpf-f9UCAOP9fOpoGb1g4jx0qhDER3nTjgeqvRAEY41KAIgWKYseOA8mfRw6ZLJpKu2xQTfDUzuQU4ktVaL7XKxEtlv3hPkuO8y5R4ujqTGxRlalQ&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E6kiQ81dLmrzPMoRNfCa1Ktt_aYwKkt6Zzi2XAdsCae9oceQtEF0A80v5vWptDAYaDea1IhDhvPL3GZ1VEkzpdwLuV36Hv-sj854yrvC6QNR2ulDjz4RaZdt2mAVBUEInU0ZoPs%3D&sa=X&ved=2ahUKEwju0u231O6QAxV-UUEAHdkBN2gQk8gLegQILBAB&ictx=1&biw=448&bih=851&dpr=2.25",
          "_blank",
        )
      }, 1000)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: "סטודיו סשה Tattoos",
      text: "ממליץ לבדוק את הסטודיו!",
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
        showToastMessage("הקישור הועתק 🙂")
      } catch (e) {
        showToastMessage("לא הצלחתי להעתיק, אפשר להעתיק ידנית.")
      }
    } else {
      showToastMessage("הדפדפן לא תומך בשיתוף. העתק/י את הכתובת מהשורת כתובת.")
    }
  }

  const handleRatingClick = () => {
    ratingDialogRef.current?.showModal()
  }

  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-start relative bg-cover bg-center py-6 sm:py-8"
      style={{ backgroundImage: "url(/images/mandala-background.jpg)" }}
      dir="rtl"
      lang="he"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

      <div className="relative z-10 w-[min(420px,92vw)] bg-black/45 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex justify-center pt-6 pb-2">
          <div className="relative w-[138px] h-[138px]">
            <Image
              src="/images/studio-logo.png"
              alt="סטודיו סשה Tattoos לוגו"
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
            סטודיו סשה Tattoos
          </h1>
          <p className="text-center text-sm text-zinc-300 opacity-90 m-0 mb-1">סטודיו ביחס אישי ועבודה מדויקת</p>
          <p className="text-center text-sm text-zinc-400 opacity-90 m-0 mb-1">טבריה📍</p>
          <p className="text-center text-base font-semibold text-red-400 m-0 mb-3.5 tracking-wider">052-620-2701</p>
        </div>

        <div className="grid gap-2.5 px-4 pb-3.5 sm:grid-cols-2">
          <button
            onClick={handleRatingClick}
            className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-900/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150"
          >
            ⭐ דרגו אותנו!
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2.5 border border-zinc-700 rounded-full px-4.5 py-3.5 font-bold bg-zinc-900/80 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150"
          >
            💖 ספרו לחבר
          </button>
        </div>

        {/* Social media buttons section */}
        <div className="px-4 py-3">
          <div className="flex justify-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61572348743736"
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

        <div className="border-t border-zinc-800 px-3.5 py-2.5 text-center text-xs text-zinc-500 bg-black/60">
          © {new Date().getFullYear()} סטודיו סשה Tattoos
        </div>

        <div className="border-t border-zinc-800 px-4 py-3 bg-black/70">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-[50px] h-[50px] flex-shrink-0">
              <Image
                src="/images/studio-logo.png"
                alt="סטודיו סשה Tattoos לוגו"
                width={50}
                height={50}
                className="drop-shadow-lg"
                style={{ clipPath: "circle(40% at 50% 50%)" }}
              />
            </div>
            <div className="text-center space-y-0.5 flex-grow">
              <p className="text-xs text-zinc-300 m-0">עליזה בגין 123 טבריה</p>
              <p className="text-xs text-zinc-300 m-0">052-620-2701</p>
              <p className="text-[10px] text-zinc-500 m-0">All rights reserved Shoam Taitler</p>
            </div>
            <div className="w-[50px] flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Portfolio Carousel Section */}
      <div className="relative z-10 w-[min(420px,92vw)] mt-6 sm:mt-8">
        <div className="bg-black/45 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-4">
          <h2 className="text-center font-bold text-xl sm:text-2xl mb-4 text-white tracking-wide">
            תיקיית עבודות 📸
          </h2>
          <PortfolioCarousel />
        </div>
      </div>

      {/* Shapo Widget Section */}
      <div className="relative z-10 w-[min(420px,92vw)] mt-6 sm:mt-8">
        <div className="bg-black/30 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-4">
          <div id="shapo-widget-878653ba3bbe62a9a2c1"></div>
        </div>
      </div>

      {/* Toast */}
      <Toast message={toastMessage} isVisible={showToast} />

      {/* Rating Dialog */}
      <RatingDialog ref={ratingDialogRef} onComplete={handleRatingComplete} />
    </main>
  )
}

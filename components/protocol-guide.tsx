"use client"

import { useEffect, useRef } from "react"
import { ChevronDown, Droplet, Ban, Wine, Check, PenTool } from "lucide-react"
import { useTranslation } from "react-i18next"

// Simple intersection reveal utility
function useReveal() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const items = Array.from(el.querySelectorAll('[data-reveal]')) as HTMLElement[]
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100','translate-y-0')
          }
        })
      },
      { threshold: 0.15 }
    )
    items.forEach(i => observer.observe(i))
    return () => observer.disconnect()
  }, [])
  return containerRef
}

export default function ProtocolGuide() {
  const { t } = useTranslation()
  const ref = useReveal()

  return (
    <section ref={ref} className="w-full mt-10 max-w-3xl px-4">
      <div className="relative bg-gradient-to-b from-zinc-900/90 via-black/80 to-black/90 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.08] bg-[radial-gradient(circle_at_center,_#fff_0,_transparent_60%)]" />
        <div className="relative p-8">
          <header className="text-center mb-6" data-reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-wide text-white mb-3 flex items-center justify-center gap-2">
              <PenTool className="w-8 h-8 text-red-500" />
              {t("beforeNeedleTitle", { defaultValue: "Before The Needle" })}
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto">
              {t("beforeNeedleIntro", { defaultValue: "Optimize your skin and your session. A little preparation ensures better healing and lasting vibrancy." })}
            </p>
          </header>

          <div className="space-y-10">
            {/* Hydration */}
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6 sm:p-7" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <Droplet className="w-7 h-7 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {t("hydrationHeading", { defaultValue: "Hydration & Skin Prep" })}
                </h3>
              </div>
              <ul className="space-y-2 text-zinc-300 text-sm leading-relaxed list-disc pl-5">
                <li>{t("hydration1", { defaultValue: "Drink plenty of water for 48 hours before your session." })}</li>
                <li>{t("hydration2", { defaultValue: "Moisturize the area lightly once daily – avoid heavy creams day-of." })}</li>
                <li>{t("hydration3", { defaultValue: "No intense sun or tanning of the area for one week prior." })}</li>
              </ul>
            </div>

            {/* Nutrition */}
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6 sm:p-7" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <Wine className="w-7 h-7 text-amber-400" />
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {t("nutritionHeading", { defaultValue: "Nutrition & Substances" })}
                </h3>
              </div>
              <ul className="space-y-2 text-zinc-300 text-sm leading-relaxed list-disc pl-5">
                <li>{t("nutrition1", { defaultValue: "Eat a balanced meal 1–2 hours before; avoid coming fasted." })}</li>
                <li>{t("nutrition2", { defaultValue: "Skip alcohol for 24 hours – it thins the blood." })}</li>
                <li>{t("nutrition3", { defaultValue: "Limit heavy caffeine the morning of your appointment." })}</li>
              </ul>
            </div>

            {/* Clothing */}
            <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6 sm:p-7" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-7 h-7 text-green-400" />
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {t("clothingHeading", { defaultValue: "Clothing & Comfort" })}
                </h3>
              </div>
              <ul className="space-y-2 text-zinc-300 text-sm leading-relaxed list-disc pl-5">
                <li>{t("clothing1", { defaultValue: "Wear loose, dark clothing that exposes the area easily." })}</li>
                <li>{t("clothing2", { defaultValue: "Pack a light snack for longer sessions." })}</li>
                <li>{t("clothing3", { defaultValue: "Bring a layer – body temperature can drop during focus." })}</li>
              </ul>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-red-600/80 to-red-700/80 border border-red-800 rounded-2xl p-6 sm:p-7" data-reveal>
              <div className="flex items-center gap-3 mb-3">
                <ChevronDown className="w-7 h-7 text-white" />
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {t("readyHeading", { defaultValue: "Arrive Ready" })}
                </h3>
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                {t("readyText", { defaultValue: "Relax, breathe and trust the process. Preparation helps your tattoo heal cleaner, brighter and with less irritation." })}
              </p>
              <p className="text-xs text-white/70">
                {t("guideNote", { defaultValue: "This guide is informational only and not medical advice." })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-[11px] text-zinc-500 mt-4" data-reveal>
        {t("translationNotice", { defaultValue: "Guide currently in English – localized versions coming soon." })}
      </p>
    </section>
  )
}

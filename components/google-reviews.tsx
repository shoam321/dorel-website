"use client"

import { useTranslation } from "react-i18next"

export default function GoogleReviews() {
  const { t } = useTranslation()
  return (
    <section className="w-[min(420px,92vw)] mt-6 sm:mt-8">
      <div className="bg-black/45 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-5">
        <h2 className="text-center font-bold text-xl sm:text-2xl mb-4 text-white tracking-wide">
          {t("googleReviews", { defaultValue: "Google Reviews" })}
        </h2>
        <p className="text-sm text-zinc-300 text-center mb-4">
          {t("googleReviewsIntro", { defaultValue: "See what clients are saying about us." })}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => window.open("https://www.google.com/search?q=sasha+tattoo+studio+tiberias", "_blank")}
            className="rounded-full px-6 py-3 font-semibold bg-gradient-to-br from-yellow-500 to-yellow-600 text-black shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            {t("viewOnGoogle", { defaultValue: "View on Google" })}
          </button>
        </div>
      </div>
    </section>
  )
}

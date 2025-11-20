"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { useTranslation } from "react-i18next"
import StarRating from "./star-rating"

interface RatingDialogProps {
  onComplete: (average: number) => void
}

const RatingDialog = forwardRef<HTMLDialogElement, RatingDialogProps>(({ onComplete }, ref) => {
  const { t, i18n } = useTranslation()
  const [ratings, setRatings] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ratingValues = Object.values(ratings)
  const completedRatings = ratingValues.filter((n) => n > 0)

  const handleStarClick = (question: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [question]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (completedRatings.length < 5) {
      alert(t("ratingIncomplete") || "Please rate all 5 questions")
      return
    }

    const average = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length

    setIsSubmitting(true)

    try {
      // Send rating payload to n8n webhook
      const WEBHOOK_URL = "https://shairouvinov78.app.n8n.cloud/webhook-test/submit-rating"
      const payload = {
        businessName: "Studio Sasha Tattoos",
        language: i18n.language,
        ratings,
        average: Number(average.toFixed(1)),
        timestamp: new Date().toISOString(),
      }

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error("n8n webhook responded with error status", response.status)
        // Non-blocking: still proceed to close and show completion UX
      } else {
        console.log("Sent to n8n successfully")
      }
    } catch (error) {
      console.error("Error sending to n8n:", error)
      // Non-blocking error; user still gets completion flow
    } finally {
      setIsSubmitting(false)
      if (ref && "current" in ref && ref.current?.open) {
        ref.current.close()
      }
      onComplete(average)
    }
  }

  const questions = [
    t("q1_experience_label") || "How would you rate your overall experience?",
    t("q2_quality_label") || "How would you rate the quality of the tattoo?",
    t("q3_service_label") || "How would you rate the service?",
    t("q4_ambiance_label") || "How would you rate the ambiance and cleanliness?",
    t("q5_recommend_label") || "Would you recommend us to others?",
  ]

  return (
    <dialog
      ref={ref}
      className="border-2 border-zinc-800 rounded-2xl p-2 w-[min(92vw,600px)] shadow-2xl backdrop:bg-black/60 self-center bg-zinc-950 opacity-90 max-h-[90vh] overflow-y-auto"
    >
      <h3 className="m-0 mb-1 text-sm font-bold text-white">{t("yourOpinionMatters") || "Your opinion matters to us"}</h3>
      <p className="m-0 mb-1.5 text-xs text-zinc-400">{t("rateEachSection") || "Rate each section between ⭐1 and ⭐5"}</p>

      <form onSubmit={handleFormSubmit} className="space-y-1.5">
        {questions.map((question, idx) => {
          const qKey = `q${idx + 1}` as keyof typeof ratings
          return (
            <div key={qKey} className="grid gap-1.5 my-1.5 border border-zinc-800 rounded-2xl p-1.5 bg-zinc-900/50">
              <label className="text-xs text-zinc-300">{question}</label>
              <StarRating value={ratings[qKey]} onChange={(value) => handleStarClick(qKey, value)} />
              <input type="hidden" name={`rating_${qKey}`} value={ratings[qKey]} />
            </div>
          )
        })}
        
        <div className="flex gap-1.5 flex-wrap mt-1.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-1.5 border-0 rounded-full px-3 py-2 text-sm font-bold bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-900/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("submitting") || "Submitting..." : t("submit") || "Submit"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (ref && "current" in ref) {
                ref.current?.close()
              }
            }}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-1.5 border border-zinc-700 rounded-full px-3 py-2 text-sm font-bold bg-zinc-900/80 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("close") || "Close"}
          </button>
        </div>
      </form>
    </dialog>
  )
})

RatingDialog.displayName = "RatingDialog"

export default RatingDialog

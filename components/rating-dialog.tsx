"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import StarRating from "./star-rating"

interface RatingDialogProps {
  onComplete: (average: number) => void
}

const RatingDialog = forwardRef<HTMLDialogElement, RatingDialogProps>(({ onComplete }, ref) => {
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
      alert("נא לדרג את כל 5 השאלות")
      return
    }

    setIsSubmitting(true)

    try {
      const average = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length

      // Prepare JSON payload in the exact format required by n8n
      const payload = {
        businessName: "Dorel Studio",
        average: Math.round(average * 10) / 10, // Round to 1 decimal place
        feedback: "", // No custom feedback field in the form yet
        timestamp: new Date().toISOString(),
        q1: ratings.q1,
        q2: ratings.q2,
        q3: ratings.q3,
        q4: ratings.q4,
        q5: ratings.q5,
        customerName: "", // Optional field - not collected in form
        customerPhone: "", // Optional field - not collected in form
        source: "rating-page",
      }

      // Submit to n8n Production webhook
      const response = await fetch(
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://shairouvinovisr.app.n8n.cloud/webhook/submit-rating',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        console.log('Rating submitted successfully to n8n')
        
        if (ref && "current" in ref && ref.current?.open) {
          ref.current.close()
        }

        onComplete(average)
      } else {
        const errorData = await response.text()
        console.error('n8n submission failed:', errorData)
        throw new Error('Rating submission failed')
      }
    } catch (error) {
      console.error('Error submitting rating:', error)
      alert('אירעה שגיאה בשליחת הדעה')
    } finally {
      setIsSubmitting(false)
    }
  }

  const questions = [
    "איך היית מדרג/ת את החוויה הכללית שלך אצלנו?",
    "איך היית מדרג/ת את איכות ההדרכה של המדריכים?",
    "איך היית מדרג/ת את רמת השירות והיחס שקיבלת?",
    "איך היית מדרג/ת את האווירה והניקיון במתחם?",
    "באיזו מידה היית ממליץ/ה על הסטודיו לחבר או קולגה?",
  ]

  return (
    <dialog
      ref={ref}
      className="border-2 border-gray-900 rounded-2xl p-4 w-[min(92vw,720px)] shadow-2xl backdrop:bg-black/45 self-center"
    >
      <h3 className="m-0 mb-2.5 text-base font-bold">דעתכם חשובה לנו</h3>
      <p className="m-0 mb-2 text-sm text-gray-600">דרגו כל סעיף בין ⭐1 ל-⭐5</p>

      <form onSubmit={handleFormSubmit} className="space-y-2">
        {questions.map((question, idx) => {
          const qKey = `q${idx + 1}` as keyof typeof ratings
          return (
            <div key={qKey} className="grid gap-2 my-2].5 border border-gray-200 rounded-3xl p-2.5 bg-white">
              <label className="text-sm text-gray-600">{question}</label>
              <StarRating value={ratings[qKey]} onChange={(value) => handleStarClick(qKey, value)} />
            </div>
          )
        })}
        
        <div className="flex gap-2 flex-wrap mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "שולח..." : "שליחה"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (ref && "current" in ref) {
                ref.current?.close()
              }
            }}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-white text-gray-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            סגירה
          </button>
        </div>
      </form>
    </dialog>
  )
})

RatingDialog.displayName = "RatingDialog"

export default RatingDialog

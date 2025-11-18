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
      const formData = new FormData()
      const average = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length

      // Add all form data with descriptive names and star display
      const starDisplay = (rating: number) => '⭐'.repeat(rating) + ' ' + `(${rating}/5)`
      
      formData.append('החוויה הכללית', starDisplay(ratings.q1))
      formData.append('איכות ההדרכה', starDisplay(ratings.q2))
      formData.append('רמת השירות', starDisplay(ratings.q3))
      formData.append('אווירה וניקיון', starDisplay(ratings.q4))
      formData.append('המלצה לאחרים', starDisplay(ratings.q5))
      formData.append('ממוצע כללי', `⭐ ${average.toFixed(1)}/5 ${average >= 4 ? '🎉' : ''}`)
      formData.append('סטודיו', 'סטודיו דוראל אזולאי 💪')
      formData.append('תאריך שליחה', new Date().toLocaleString("he-IL"))

      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xdkbkoel', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        console.log('Form submitted successfully to Formspree')
        
        if (ref && "current" in ref && ref.current?.open) {
          ref.current.close()
        }

        onComplete(average)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
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
              <input type="hidden" name={`rating_${qKey}`} value={ratings[qKey]} />
            </div>
          )
        })}
        
        {/* Additional form data for Formspree */}
        <input type="hidden" name="average_rating" value={(ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)} />
        <input type="hidden" name="studio_name" value="סטודיו דוראל אזולאי" />
        <input type="hidden" name="submission_date" value={new Date().toLocaleString("he-IL")} />
        
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

      {completedRatings.length == 5 && <iframe src=""/>}
    </dialog>
  )
})

RatingDialog.displayName = "RatingDialog"

export default RatingDialog

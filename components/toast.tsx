"use client"

interface ToastProps {
  message: string
  isVisible: boolean
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-x-0 top-5 mx-auto w-[min(520px,92vw)] bg-zinc-900/98 border border-red-600 rounded-2xl shadow-2xl px-4 py-3.5 text-center text-white font-bold transition-all duration-200 z-[2147483647] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2.5 pointer-events-none"
      }`}
    >
      {message}
    </div>
  )
}

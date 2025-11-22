"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface StorySection {
  id: string
  image: string
  titleKey: string
  descriptionKey: string
  align?: "left" | "right"
}

const storySections: StorySection[] = [
  {
    id: "chapter1",
    image: "https://lh3.googleusercontent.com/p/AF1QipPUoF77vqIVBqruj_yaKnbF17GOL-P6F3uxuuHx=s680-w680-h510-rw",
    titleKey: "storyline.chapter1.title",
    descriptionKey: "storyline.chapter1.description",
    align: "left",
  },
  {
    id: "chapter2",
    image: "https://lh3.googleusercontent.com/p/AF1QipMV2TkLaDbcnFg2dftiNtVqHxcmLPPbsc7D4OSY=s680-w680-h510-rw",
    titleKey: "storyline.chapter2.title",
    descriptionKey: "storyline.chapter2.description",
    align: "right",
  },
  {
    id: "chapter3",
    image: "https://lh3.googleusercontent.com/p/AF1QipNlXxafB4LvYko7gQPYBG1KZrCnQaK5tz_dyIxA=s680-w680-h510-rw",
    titleKey: "storyline.chapter3.title",
    descriptionKey: "storyline.chapter3.description",
    align: "left",
  },
]

export default function StorylineScroll() {
  const { t, i18n } = useTranslation()
  const dir = i18n.language === "he" || i18n.language === "ar" ? "rtl" : "ltr"
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll(".story-section")
    if (!sections) return

    sections.forEach((section: Element) => {
      const imageBg = section.querySelector(".image-bg") as HTMLElement
      const textContent = section.querySelector(".text-content") as HTMLElement

      // Parallax effect on image
      gsap.to(imageBg, {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: false,
        },
        y: -50,
        ease: "none",
      })

      // Slide-in text animation
      gsap.fromTo(
        textContent,
        {
          opacity: 0,
          x: section === sections[0] ? -100 : 100,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
            markers: false,
          },
          opacity: 1,
          x: 0,
          ease: "power2.out",
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="relative w-full bg-black/30 py-12 md:py-20" ref={containerRef} dir={dir}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 glow-title">
            {t("storyline.heading") || "Our Storyline"}
          </h2>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto">
            {t("storyline.subtitle") || "Follow our journey of passion, art, and transformation"}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {storySections.map((section, idx) => (
            <div
              key={section.id}
              className="story-section relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden flex items-center"
            >
              {/* Background Image with Parallax */}
              <div
                className="image-bg absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${section.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              </div>

              {/* Text Content */}
              <div
                className={`text-content relative z-10 w-full max-w-2xl mx-auto px-6 md:px-12 ${
                  section.align === "right" ? "md:ml-auto md:text-right" : "md:mr-auto"
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {t(section.titleKey)}
                  </h3>
                  <p className="text-base md:text-lg text-zinc-100 leading-relaxed drop-shadow-md max-w-xl">
                    {t(section.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes glowPulse {
          0% {
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.15), 0 0 25px rgba(130, 87, 229, 0.35);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(130, 87, 229, 0.7);
          }
          100% {
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.15), 0 0 25px rgba(130, 87, 229, 0.35);
          }
        }
        .glow-title {
          animation: glowPulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

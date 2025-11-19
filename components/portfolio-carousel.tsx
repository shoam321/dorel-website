'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

interface PortfolioImage {
  url: string
  alt: string
}

const portfolioImages: PortfolioImage[] = [
  {
    url: 'https://lh3.googleusercontent.com/p/AF1QipPUoF77vqIVBqruj_yaKnbF17GOL-P6F3uxuuHx=s680-w680-h510-rw',
    alt: 'tattoo portfolio 1',
  },
  {
    url: 'https://lh3.googleusercontent.com/p/AF1QipNlXxafB4LvYko7gQPYBG1KZrCnQaK5tz_dyIxA=s680-w680-h510-rw',
    alt: 'tattoo portfolio 2',
  },
  {
    url: 'https://lh3.googleusercontent.com/p/AF1QipNqbOb4c1oCRZs5WWd_0gFv6EEnyA7ryyoM1v6m=s680-w680-h510-rw',
    alt: 'tattoo portfolio 3',
  },
  {
    url: 'https://lh3.googleusercontent.com/p/AF1QipOgdZphmCiMpWocRcUSdkHV1YJn4d5RoT_tbY9l=s680-w680-h510-rw',
    alt: 'tattoo portfolio 4',
  },
]

export default function PortfolioCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 10,
      },
      slideChanged() {
        console.log('slide changed')
      },
    },
    []
  )

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleSlideChange = () => {
      if (instanceRef.current) {
        setCurrentSlide(instanceRef.current.track.details.rel)
      }
    }

    instanceRef.current?.on('slideChanged', handleSlideChange)

    return () => {
      // Cleanup if needed
    }
  }, [instanceRef])

  const goToPrevious = () => {
    instanceRef.current?.prev()
  }

  const goToNext = () => {
    instanceRef.current?.next()
  }

  return (
    <div className="relative w-full bg-black/30 backdrop-blur-sm rounded-2xl overflow-hidden">
      {/* Carousel Container */}
      <div
        ref={sliderRef}
        className="keen-slider"
      >
        {portfolioImages.map((image, index) => (
          <div
            key={index}
            className="keen-slider__slide flex items-center justify-center bg-black/50"
          >
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px]">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {portfolioImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              instanceRef.current?.moveToIdx(index)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

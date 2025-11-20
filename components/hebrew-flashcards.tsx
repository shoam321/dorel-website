"use client"

import { motion } from "framer-motion"
import { Droplet, Ban, Coffee, Moon, Sun, Shirt, Check, X, Sparkles } from "lucide-react"
import { Heebo, Rubik } from "next/font/google"

const heebo = Heebo({ subsets: ["hebrew"], weight: ["300", "400", "500", "700"], variable: "--font-heebo" })
const rubik = Rubik({ subsets: ["hebrew"], weight: ["300", "400", "500", "700"], variable: "--font-rubik" })

const TattooMotifs = {
  floral: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 10 L55 20 L65 25 L55 30 L50 40 L45 30 L35 25 L45 20 Z" opacity="0.7"/>
      <path d="M50 40 C60 50, 70 60, 50 70 C30 60, 40 50, 50 40 Z" opacity="0.7"/>
      <path d="M50 70 L40 80 M50 70 L60 80 M50 70 L50 90" opacity="0.5"/>
    </svg>
  `,
  geometric: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="50" r="30" opacity="0.6"/>
      <path d="M20 50 L50 20 L80 50 L50 80 Z" opacity="0.8"/>
      <line x1="20" y1="50" x2="80" y2="50" opacity="0.4"/>
      <line x1="50" y1="20" x2="50" y2="80" opacity="0.4"/>
    </svg>
  `,
  minimal_wave: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 50 C 30 30, 70 30, 90 50 S 70 70, 50 70 S 30 70, 10 50" opacity="0.7"/>
      <path d="M20 60 C 40 40, 60 40, 80 60" opacity="0.5"/>
    </svg>
  `,
  dagger: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 10 L45 40 L50 90 L55 40 Z" opacity="0.8"/>
      <path d="M40 35 L60 35 L50 10 Z" opacity="0.6"/>
      <path d="M40 90 A10 10 0 0 0 60 90" opacity="0.4"/>
    </svg>
  `,
  eye: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 50 C 30 20, 70 20, 90 50 C 70 80, 30 80, 10 50 Z" opacity="0.7"/>
      <circle cx="50" cy="50" r="10" opacity="0.9"/>
      <circle cx="50" cy="50" r="2" fill="currentColor" opacity="1"/>
    </svg>
  `,
  moon_star: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 20 A30 30 0 0 1 70 20 A20 20 0 0 0 30 20 Z" opacity="0.7"/>
      <path d="M75 30 L80 40 L70 40 L75 50 L70 60 L80 60 L85 70 L90 60 L100 60 L95 50 L100 40 L90 40 Z" opacity="0.5" transform="scale(0.3) translate(180, -20)"/>
    </svg>
  `,
}

const motifOrder = [
  TattooMotifs.floral,
  TattooMotifs.geometric,
  TattooMotifs.minimal_wave,
  TattooMotifs.dagger,
  TattooMotifs.eye,
  TattooMotifs.moon_star,
]

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

const tips = [
  {
    id: 1,
    type: "do",
    icon: <Droplet size={40} />,
    title: "הידרציה ונוזלים",
    content: "הקפידו לשתות הרבה מים ב-24 השעות שלפני התור. עור רווי מקבל את הדיו טוב יותר, מדמם פחות ומחלים מהר יותר.",
  },
  {
    id: 2,
    type: "dont",
    icon: <Ban size={40} />,
    title: "אלכוהול",
    content: "אסור לשתות אלכוהול 24 שעות לפני הקעקוע! אלכוהול מדלל את הדם, גורם לדימום יתר ופוגע באיכות הדיו ובתוצאה הסופית.",
  },
  {
    id: 3,
    type: "do",
    icon: <Coffee size={40} />,
    title: "ארוחה טובה",
    content: "אל תגיעו על בטן ריקה. אכלו ארוחה מזינה כשעה לפני התור כדי לשמור על רמת סוכר יציבה ולמנוע סחרחורות או התעלפויות.",
  },
  {
    id: 4,
    type: "do",
    icon: <Shirt size={40} />,
    title: "ביגוד נוח",
    content: "לבשו בגדים שחורים ומשוחררים. הדיו עלול ללכלך בגדים בהירים, וחשוב שתהיה לנו גישה נוחה לאזור המקועקע מבלי ללחוץ עליו.",
  },
  {
    id: 5,
    type: "dont",
    icon: <Sun size={40} />,
    title: "שמש ושיזוף",
    content: "אין לקעקע על עור שרוף או שזוף טרי. הימנעו מחשיפה לשמש או ממיטות שיזוף באזור הקעקוע בשבוע שלפני התור.",
  },
  {
    id: 6,
    type: "do",
    icon: <Moon size={40} />,
    title: "שינה ומנוחה",
    content: "הגוף זקוק לאנרגיה כדי להתמודד עם הכאב והאדרנלין. נסו לישון טוב בלילה שלפני כדי להגיע רגועים ומוכנים.",
  },
]

export default function HebrewFlashcards() {
  return (
    <section
      className={`py-16 relative overflow-visible w-full ${heebo.variable} ${rubik.variable}`}
      dir="rtl"
    >
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4 text-purple-accent/80">
            <Sparkles size={18} className="text-purple-accent" />
            <h3 className="text-sm uppercase tracking-[0.4em] font-medium text-purple-accent/80 rubik-font">
              הכנה לקעקוע
            </h3>
            <Sparkles size={18} className="text-purple-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 rubik-font glow-title">
            <span className="title-outline">טיפים לפני </span>
            <span className="text-rainbow">הקעקוע הראשון</span>
          </h2>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              className="flip-card h-64 cursor-pointer"
              variants={cardVariants}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div
                    className="tattoo-motif"
                    dangerouslySetInnerHTML={{ __html: motifOrder[index % motifOrder.length] }}
                    style={{ transform: `translate(-50%, -50%) rotate(${index * 3 + 5}deg) scale(1.1)` }}
                  />
                  <div className="relative z-10 flex flex-col justify-center items-center">
                    <div
                      className={`p-4 rounded-full mb-4 ${
                        tip.type === "do" ? "bg-emerald-900/30 text-emerald-400" : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {tip.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 rubik-font">{tip.title}</h3>
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wider opacity-70 heebo-font">
                      {tip.type === "do" ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Check size={14} /> עשה
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1">
                          <X size={14} /> אל תעשה
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div
                    className="tattoo-motif"
                    dangerouslySetInnerHTML={{ __html: motifOrder[index % motifOrder.length] }}
                    style={{ transform: `translate(-50%, -50%) rotate(${index * 3 - 5}deg) scale(1.1)` }}
                  />
                  <div className="relative z-10 flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold mb-4 text-white rubik-font">{tip.title}</h3>
                    <p className="text-center leading-relaxed font-medium px-2 text-purple-100 heebo-font">{tip.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        :global(:root) {
          --purple-primary: #8a2be2;
          --purple-accent: #e0b0ff;
          --dark-purple: #1f1429;
          --card-front-bg: #281a38;
          --card-border: rgba(138, 43, 226, 0.3);
        }
        .rubik-font {
          font-family: "Rubik", var(--font-rubik), system-ui, -apple-system, sans-serif;
        }
        .heebo-font {
          font-family: "Heebo", var(--font-heebo), system-ui, -apple-system, sans-serif;
        }
        @keyframes cardFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .flip-card {
          perspective: 1000px;
          animation: cardFloat 7s ease-in-out infinite;
        }
        .flip-card:nth-of-type(2n) {
          animation-delay: 0.6s;
        }
        .flip-card:nth-of-type(3n) {
          animation-delay: 1.2s;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner,
        .flip-card:focus-within .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        .flip-card-front {
          background-color: var(--card-front-bg);
          border: 1px solid var(--card-border);
          color: #e0e0e0;
        }
        .flip-card-back {
          background: linear-gradient(135deg, #8a2be2, #a020f0);
          color: #fff;
          transform: rotateY(180deg);
        }
        .text-purple-gradient {
          background: linear-gradient(to right, #8a2be2, #e0b0ff, #8a2be2);
          -webkit-background-clip: text;
          color: transparent;
        }
        @keyframes glowPulse {
          0% { text-shadow: 0 0 12px rgba(255, 255, 255, 0.15), 0 0 25px rgba(130, 87, 229, 0.35); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(130, 87, 229, 0.7); }
          100% { text-shadow: 0 0 12px rgba(255, 255, 255, 0.15), 0 0 25px rgba(130, 87, 229, 0.35); }
        }
        .glow-title {
          animation: glowPulse 3s ease-in-out infinite;
          position: relative;
          display: inline-block;
        }
        .title-outline {
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
        }
        .text-rainbow {
          background: linear-gradient(120deg, #ff007a, #ffae00, #5cffab, #00c6ff, #bd5dff, #ff007a);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          color: transparent;
          animation: rainbowShift 5s ease infinite;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
        }
        @keyframes rainbowShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tattoo-motif {
          position: absolute;
          opacity: 0.08;
          color: currentColor;
          width: 80%;
          height: 80%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(5deg);
          z-index: 0;
          transition: opacity 0.5s ease;
        }
        .flip-card-front .tattoo-motif {
          color: rgba(224, 176, 255, 0.1);
          opacity: 0.1;
        }
        .flip-card-back .tattoo-motif {
          color: rgba(0, 0, 0, 0.1);
          opacity: 0.15;
        }
      `}</style>
    </section>
  )
}

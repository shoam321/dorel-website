import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import es from './locales/es.json'
import ru from './locales/ru.json'
import ar from './locales/ar.json'
import th from './locales/th.json'
import he from './locales/he.json'

const resources = {
  en: { translation: en },
  es: { translation: es },
  ru: { translation: ru },
  ar: { translation: ar },
  th: { translation: th },
  he: { translation: he },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'he',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

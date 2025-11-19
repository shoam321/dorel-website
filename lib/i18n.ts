import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

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

const initialLang = typeof window !== 'undefined'
  ? (localStorage.getItem('gtranslate_language') || 'he')
  : 'he'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

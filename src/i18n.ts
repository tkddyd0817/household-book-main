// // src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from '../public/locales/ko/common.json';
import en from '../public/locales/en/common.json';
import ja from '../public/locales/ja/common.json';
import fr from '../public/locales/fr/common.json';
import es from '../public/locales/es/common.json';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        ko: { common: ko },
        en: { common: en },
        ja: { common: ja },
        fr: { common: fr },
        es: { common: es },
      },
      lng: 'ko', // 강제 고정
      fallbackLng: 'ko',
      interpolation: { escapeValue: false },
    });
} 

export default i18n;


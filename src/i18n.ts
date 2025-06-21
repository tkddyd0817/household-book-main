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
      // detection: { ... }  // 이 옵션이 있다면 잠시 주석처리
    });
} // ← 이 부분이 꼭 필요합니다!

export default i18n;

// // src/i18n.ts
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import ko from '../public/locales/ko/common.json';
// import en from '../public/locales/en/common.json';
// import ja from '../public/locales/ja/common.json';
// import fr from '../public/locales/fr/common.json';
// import es from '../public/locales/es/common.json';

// if (!i18n.isInitialized) {
//     i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       ko: { common: ko },
//       en: { common: en },
//       ja: { common: ja },
//       fr: { common: fr },
//       es: { common: es },
//     },
//     lng: 'ko', // 강제 고정
//     fallbackLng: 'ko',
//     interpolation: { escapeValue: false },
//     // detection: { ... }  // 이 옵션이 있다면 잠시 주석처리
//   });
//   i18n
//     .use(initReactI18next)
//     .init({
//       resources: {
//         ko: { common: ko },
//         en: { common: en },
//         ja: { common: ja },
//         fr: { common: fr },
//         es: { common: es },
//       },
//       lng: 'ko',
//       fallbackLng: 'ko',
//       interpolation: { escapeValue: false },
//     });
// }

// export default i18n;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import ko from '../public/locales/ko/common.json';
// import en from '../public/locales/en/common.json';
// import ja from '../public/locales/ja/common.json';
// import fr from '../public/locales/fr/common.json';
// import es from '../public/locales/es/common.json';

// if (!i18n.isInitialized) {
//   i18n
//     .use(initReactI18next)
//     .init({
//       resources: {
//         ko: { common: ko },
//         en: { common: en },
//         ja: { common: ja },
//         fr: { common: fr },
//         es: { common: es },
//       },
//       lng: 'ko',
//       fallbackLng: 'ko',
//       interpolation: { escapeValue: false },
//     });
// }

// export default i18n;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import ko from '../public/locales/ko/common.json';
// import en from '../public/locales/en/common.json';
// import ja from '../public/locales/ja/common.json';
// import fr from '../public/locales/fr/common.json';
// import es from '../public/locales/es/common.json';

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       ko: { translation: ko },
//       en: { translation: en },
//       ja: { translation: ja },
//       fr: { translation: fr },
//       es: { translation: es },
//     },
//     lng: 'ko',
//     fallbackLng: 'ko',
//     interpolation: { escapeValue: false },
//   });

// export default i18n;

// import NextI18Next from 'next-i18next';

// const NextI18NextInstance = new NextI18Next({
//   defaultLanguage: 'ko',
//   otherLanguages: ['en', 'ja', 'fr', 'es'],
//   // next-i18next.config.js 경로 지정 (필요시)
//   // configPath: 'next-i18next.config.js',
// });

// export default NextI18NextInstance.i18n;
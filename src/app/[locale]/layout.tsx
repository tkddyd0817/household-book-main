//[locale]/layout.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import React from "react";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(params);

  React.useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    // 디버깅용
    console.log(
      "locale:",
      locale,
      "i18n.language:",
      i18n.language,
      "t(balance):",
      i18n.t("balance", { ns: "common" })
    );
    // console.log('locale:', locale, 'i18n.language:', i18n.language);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>{children}</Provider>
    </I18nextProvider>
  );
}

// 'use client';

// import { Provider } from 'react-redux';
// import { store } from '@/store/store';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '@/i18n';
// import React from 'react';

// export default function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = React.use(params);

//   React.useEffect(() => {
//     if (i18n.language !== locale) {
//       i18n.changeLanguage(locale);
//     }
//   }, [locale]);
// console.log('locale:', locale, 'i18n.language:', i18n.language);
//   return (
//     <I18nextProvider i18n={i18n}>
//       <Provider store={store}>
//         {children}
//       </Provider>
//     </I18nextProvider>
//   );
// }

// 'use client';

// import { Provider } from 'react-redux';
// import { store } from '@/store/store';
// import React from 'react';

// export default function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   // locale 추출 (필요하다면)
//   const { locale } = React.use(params);

//   return (
//     // <html>과 <body>는 절대 사용하지 마세요!

//     <Provider store={store}>
//       {children}
//     </Provider>
//   );
// }

// 'use client';

// import { Provider } from 'react-redux';
// import { store } from '@/store/store';
// import React from 'react';

// export default function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   // use()로 params를 언래핑
//   const { locale } = React.use(params);

//   return (
//     <html lang={locale} suppressHydrationWarning={true}>
//       <body>
//         <Provider store={store}>
//           {children}
//         </Provider>
//       </body>
//     </html>
//   );
// }

// 'use client';

// import { Provider } from 'react-redux';
// import { store } from '@/store/store';

// export default function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   return (
//     <html lang={params.locale} suppressHydrationWarning={true}>
//       <body>
//         <Provider store={store}>
//           {children}
//         </Provider>
//       </body>
//     </html>
//   );
// }

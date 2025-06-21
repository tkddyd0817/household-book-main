//app/layout
'use client';

import { Provider } from 'react-redux';
import { usePathname } from 'next/navigation';
import './globals.css';
import { store } from '@/store/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // usePathname 훅을 사용해서 현재 경로를 가져옴
  const pathname = usePathname();
  let locale = 'ko'; // 기본값

  if (pathname) {
    const firstSegment = pathname.split('/')[1];
    if (['ko', 'en', 'ja', 'fr', 'es'].includes(firstSegment)) {
      locale = firstSegment;
    }
  }

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}



// 'use client';

// import { Provider } from 'react-redux';
// import { usePathname } from 'next/navigation';
// import './globals.css';
// import { store } from '@/store/store';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // 현재 경로에서 locale 추출
//   let locale = 'ko'; // 기본값
//   if (typeof window !== 'undefined') {
//     const pathname = window.location.pathname;
//     const firstSegment = pathname.split('/')[1];
//     if (['ko', 'en', 'ja', 'fr', 'es'].includes(firstSegment)) {
//       locale = firstSegment;
//     }
//   }

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

// import './globals.css';
// import { store } from '@/store/store';


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="ko" suppressHydrationWarning={true}>
//       <body>
//         <Provider store={store}>
//           {children}
//         </Provider>
//       </body>
//     </html>
//   );
// }


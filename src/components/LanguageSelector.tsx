import { useRouter, usePathname } from 'next/navigation';

const LANGUAGES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    // App Router에서는 locale을 쿼리스트링이나 pathname에 직접 반영해야 함
    router.push(`/${locale}${pathname.substring(3)}`); // 기존 경로에서 /ko, /en 등 앞부분만 교체
  };

  // 현재 언어 감지는 pathname에서 추출
  const currentLocale = pathname.split('/')[1] || 'ko';

  return (
    <section className="mb-4">
      <select onChange={handleChange} value={currentLocale} className="border rounded px-2 py-1">
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
    </section>
  );
}


// import { useRouter } from 'next/router';

// const LANGUAGES = [
//   { code: 'ko', label: '한국어' },
//   { code: 'en', label: 'English' },
//   { code: 'ja', label: '日本語' },
//   { code: 'fr', label: 'Français' },
//   { code: 'es', label: 'Español' },
// ];

// export default function LanguageSelector() {
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const locale = e.target.value;
//     router.push(router.pathname, router.asPath, { locale });
//   };

//   return (
//     <section className="mb-4">
//       <select onChange={handleChange} value={router.locale} className="border rounded px-2 py-1">
//         {LANGUAGES.map(lang => (
//           <option key={lang.code} value={lang.code}>{lang.label}</option>
//         ))}
//       </select>
//     </section>
//   );
// }
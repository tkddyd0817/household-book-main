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

  // 현재 언어 감지
  const currentLocale = pathname.split('/')[1];
  // 아무 언어도 선택되지 않았을 때는 빈 문자열
  const selectValue = LANGUAGES.some(lang => lang.code === currentLocale) ? currentLocale : "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    if (!locale) return; // placeholder 선택 시 무시
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/') || '/');
  };

  return (
    <section className="mb-4">
      <select
        onChange={handleChange}
        value={selectValue}
        className="border rounded px-2 py-1"
      >
        <option value="" disabled>
          Language
        </option>
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </section>
  );
}

// import { useRouter, usePathname } from 'next/navigation';

// const LANGUAGES = [
//   { code: 'ko', label: '한국어' },
//   { code: 'en', label: 'English' },
//   { code: 'ja', label: '日本語' },
//   { code: 'fr', label: 'Français' },
//   { code: 'es', label: 'Español' },
// ];

// export default function LanguageSelector() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const locale = e.target.value;
//     // App Router에서는 locale을 쿼리스트링이나 pathname에 직접 반영해야 함
//     router.push(`/${locale}${pathname.substring(3)}`); // 기존 경로에서 /ko, /en 등 앞부분만 교체
//   };

//   // 현재 언어 감지는 pathname에서 추출
//   const currentLocale = pathname.split('/')[1] || 'ko';

//   return (
//     <section className="mb-4">
//       <select onChange={handleChange} value={currentLocale} className="border rounded px-2 py-1">
//         {LANGUAGES.map(lang => (
//           <option key={lang.code} value={lang.code}>{lang.label}</option>
//         ))}
//       </select>
//     </section>
//   );
// }


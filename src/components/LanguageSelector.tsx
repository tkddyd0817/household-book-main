import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "next-i18next";
const LANGUAGES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export default function LanguageSelector() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();

  // 현재 언어 감지
  const currentLocale = pathname.split("/")[1];
  // 아무 언어도 선택되지 않았을 때는 빈 문자열
  const selectValue = LANGUAGES.some((lang) => lang.code === currentLocale)
    ? currentLocale
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    if (!locale) return; // placeholder 선택 시 무시
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || "/");
  };

  return (
    <section className="mb-4">
       <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("language_placeholder")}
      </label>
      <select
        onChange={handleChange}
        value={selectValue}
        className="border rounded px-2 py-1"
      >
        <option value="" disabled>
          {t("language_placeholder")}
        </option>
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </section>
  );
}

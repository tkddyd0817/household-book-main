import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja', 'fr', 'es'],
  },
  // 기타 옵션
};

export default nextConfig;


// import type { NextConfig } from "next";
// import nextI18NextConfig from "./next-i18next.config";

// const nextConfig: NextConfig = {
//   ...nextI18NextConfig,
//   // 기타 옵션
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

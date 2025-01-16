/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en', 'fr', 'ar', 'pt', 'ru', 'pl', 'ja', 'uk', 'es'],
    defaultLocale: 'fr',
    localeDetection: false,
  },
};

export default config;

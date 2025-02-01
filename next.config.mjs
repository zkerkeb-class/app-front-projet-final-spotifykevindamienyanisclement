/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en', 'fr', 'ar', 'pt', 'ru', 'pl', 'ja', 'uk', 'es'],
    defaultLocale: 'fr',
    localeDetection: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'spotify-api-0gmj.onrender.com'],
      bodySizeLimit: '2mb',
    },
  },
  reactStrictMode: true,
  images: {
    domains: ['spotify-api-0gmj.onrender.com', 'localhost', '127.0.0.1'],
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
};

export default config;

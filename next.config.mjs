/** @type {import('next').NextConfig} */
const config = {
  i18n: {
    locales: ['en', 'fr', 'ar', 'pt', 'ru', 'pl', 'ja', 'uk', 'es'],
    defaultLocale: 'fr',
    localeDetection: false,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'spotify-api-0gmj.onrender.com'],
      bodySizeLimit: '2mb',
    },
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spotify-api-0gmj.onrender.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
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

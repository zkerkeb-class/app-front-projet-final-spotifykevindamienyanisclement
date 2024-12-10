/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV !== 'development', // Remove console.log in production
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};

// Configuration object tells the next-pwa plugin
const withPWA = require('next-pwa')({
  dest: 'public', // Destination directory for the PWA files
  // disable: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV === 'development', // Disable PWA in development mode
  disable: true, // Disable PWA
  register: true, // Register the PWA service worker
  skipWaiting: false, // Skip waiting for service worker activation
});

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);

import type { Metadata, Viewport } from 'next';
import { TranslationProvider } from '@/providers/TranslationProvider';
import '@/styles/globals.scss';
import { AuthProvider } from '@/context/userContext';
import NetworkStatus from '@/components/NetworkStatus/NetworkStatus';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
  themeColor: '#1DB954',
};

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'A modern web music player application built with Next.js',
  metadataBase: new URL('http://localhost:3000'),
  keywords: ['music', 'streaming', 'player', 'spotify', 'clone', 'next.js'],
  authors: [{ name: 'Your Name' }],
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TranslationProvider>
          <AuthProvider>
            {children}
            <NetworkStatus />
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}

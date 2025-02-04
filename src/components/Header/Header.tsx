'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/userContext';
import { useDirection } from '@/hooks/ui/useDirection';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useTheme } from '@/hooks/settings/useTheme';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import AccessibilityMenu from '@/components/AccessibilityMenu/AccessibilityMenu';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const { logout } = useAuth();
  const { t } = useTranslationContext();
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const { isRTL } = useDirection();

  const token = Cookies.get('token');
  const username = Cookies.get('username');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    router.replace('/');
  }, [logout, router]);

  const getLogoPath = () => {
    return theme === 'dark'
      ? '/logo/Spotify_Primary_Logo_RGB_White.png'
      : '/logo/Spotify_Primary_Logo_RGB_Green.png';
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
    >
      <div
        className={`${styles.leftSection} ${isRTL ? styles.rtlSection : ''}`}
      >
        <Link href="/" className={styles.logoLink}>
          <Image
            src={getLogoPath()}
            alt="Spotify"
            className={styles.logo}
            width={96}
            height={32}
          />
          <span className={styles.logoText}>Spotify</span>
        </Link>
      </div>

      <div className={styles.centerSection}>
        <Link href="/" className={styles.homeButton}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z" />
          </svg>
        </Link>
        <div className={styles.searchContainer}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28z" />
          </svg>
          <input
            type="text"
            placeholder={t('common.search') as string}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <LanguageSelector />
        <ThemeToggle />
        <AccessibilityMenu />

        {token && username ? (
          <>
            <span className={styles.username}>{username}</span>
            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              {t('auth.logout')}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={styles.signupButton}
              onClick={() => router.push('/spotify/auth/register')}
            >
              {t('auth.signup')}
            </button>
            <button
              type="button"
              className={styles.loginButton}
              onClick={() => router.push('/spotify/auth/login')}
            >
              {t('auth.login')}
            </button>
          </>
        )}
      </div>
    </header>
  );
}

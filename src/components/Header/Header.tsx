'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslationContext } from '@/providers/TranslationProvider';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    const handleThemeChange = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme !== currentTheme) {
        setCurrentTheme(theme || 'dark');
      }
    };

    handleThemeChange();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('themechange', handleThemeChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, [currentTheme]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
    >
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src={
              currentTheme === 'dark'
                ? '/logo/Spotify_Primary_Logo_RGB_White.png'
                : '/logo/Spotify_Primary_Logo_RGB_Green.png'
            }
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
        <button
          type="button"
          className={styles.signupButton}
          onClick={() => router.push('/auth/register')}
        >
          {t('auth.signup')}
        </button>
        <button
          type="button"
          className={styles.loginButton}
          onClick={() => router.push('/auth/login')}
        >
          {t('auth.login')}
        </button>
      </div>
    </header>
  );
}

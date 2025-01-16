'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './page.module.scss';

export default function Login() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const handleThemeChange = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setCurrentTheme(theme || 'dark');
    };

    document.addEventListener('themechange', handleThemeChange);
    handleThemeChange();

    return () => {
      document.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        router.push('/');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={
            currentTheme === 'dark'
              ? '/logo/Spotify_Primary_Logo_RGB_White.png'
              : '/logo/Spotify_Primary_Logo_RGB_Green.png'
          }
          alt="Spotify"
          width={90}
          height={90}
          className={styles.logo}
          onClick={() => router.push('/')}
        />
        <h1 className={styles.title}>{t('auth.haveAccount')}</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.socialButtons}>
            <button type="button" className={styles.googleButton}>
              <Image
                src="/assets/icons/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              {t('auth.loginWithGoogle')}
            </button>

            <button type="button" className={styles.facebookButton}>
              <Image
                src="/assets/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              {t('auth.loginWithFacebook')}
            </button>

            <button type="button" className={styles.appleButton}>
              <Image
                src="/assets/icons/apple.svg"
                alt="Apple"
                width={24}
                height={24}
              />
              {t('auth.loginWithApple')}
            </button>
          </div>

          <div className={styles.divider}>
            <span>{t('common.or')}</span>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">{t('common.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('common.email')}
              required
              suppressHydrationWarning
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">{t('common.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={t('common.password')}
              required
              suppressHydrationWarning
            />
          </div>

          <Link href="/auth/forgot-password" className={styles.forgotPassword}>
            {t('auth.forgotPassword')}
          </Link>

          <button type="submit" className={styles.submitButton}>
            {t('auth.login')}
          </button>
        </form>

        <div className={styles.registerLink}>
          <p>
            {t('auth.noAccount')}{' '}
            <Link href="/auth/register">{t('auth.signup')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './page.module.scss';

interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
}

export default function Register() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

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
    setAlert(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as RegisterResponse;

      if (data.success && data.token) {
        router.push('/');
        router.refresh();
      } else if (data.message.includes('email')) {
        setFieldErrors(prev => ({ ...prev, email: data.message }));
      } else if (data.message.includes('password')) {
        setFieldErrors(prev => ({ ...prev, password: data.message }));
      } else {
        setAlert({
          type: data.message.toLowerCase().includes('existe')
            ? 'warning'
            : 'error',
          message: data.message,
        });
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err instanceof Error ? err.message : 'Une erreur est survenue',
      });
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
          priority
        />
        <h1 className={styles.title}>{t('auth.signup')}</h1>

        {alert && (
          <div className={`${styles.errorBanner} ${styles[alert.type]}`}>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">{t('common.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('common.email')}
              required
              className={fieldErrors.email ? styles.inputError : ''}
            />
            {fieldErrors.email && (
              <span className={styles.fieldError}>{fieldErrors.email}</span>
            )}
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
              className={fieldErrors.password ? styles.inputError : ''}
            />
            {fieldErrors.password && (
              <span className={styles.fieldError}>{fieldErrors.password}</span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            {t('auth.signup')}
          </button>

          <div className={styles.divider}>
            <span>{t('common.or')}</span>
          </div>

          <div className={styles.socialButtons}>
            <button type="button" className={styles.googleButton}>
              <Image
                src="/assets/icons/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              {t('auth.signupWithGoogle')}
            </button>

            <button type="button" className={styles.facebookButton}>
              <Image
                src="/assets/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              {t('auth.signupWithFacebook')}
            </button>

            <button type="button" className={styles.appleButton}>
              <Image
                src="/assets/icons/apple.svg"
                alt="Apple"
                width={24}
                height={24}
              />
              {t('auth.signupWithApple')}
            </button>
          </div>
        </form>

        <p className={styles.loginLink}>
          {t('auth.alreadyHaveAccount')}{' '}
          <Link href="/spotify/auth/login">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}

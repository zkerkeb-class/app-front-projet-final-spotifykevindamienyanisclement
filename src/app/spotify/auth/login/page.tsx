'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useAuth } from '@/context/userContext';
import styles from './page.module.scss';

interface AlertType {
  type: 'error' | 'warning';
  message: string;
}

export default function Login() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTheme, setCurrentTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(theme);

    const handleThemeChange = () => {
      const newTheme =
        document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(newTheme);
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setFieldErrors({});
    setLoading(true);

    // Validation des champs avant envoi
    const errors: { email?: string; password?: string } = {};

    if (!email.includes('@')) {
      errors.email = t('auth.invalidEmail');
    }
    if (password.length < 6) {
      errors.password = t('auth.passwordTooShort');
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        router.replace('/');
      } else {
        setAlert({ type: 'error', message: data.message });
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err instanceof Error ? err.message : t('auth.genericError'),
      });
    } finally {
      setLoading(false);
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
        <h1 className={styles.title}>{t('auth.haveAccount')}</h1>

        {alert && (
          <div
            className={`${styles.alert} ${alert.type === 'error' ? styles.errorBanner : styles.warningBanner}`}
          >
            {alert.message}
          </div>
        )}

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
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('common.email')}
              required
              aria-invalid={!!fieldErrors.email}
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

          <Link href="/auth/forgot-password" className={styles.forgotPassword}>
            {t('auth.forgotPassword')}
          </Link>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? t('auth.loading') : t('auth.login')}
          </button>
        </form>

        <div className={styles.registerLink}>
          <p>
            {t('auth.noAccount')}{' '}
            <Link href="/spotify/auth/register">{t('auth.signup')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

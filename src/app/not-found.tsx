'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  const { t } = useTranslationContext();

  return (
    <div className={styles.container}>
      <Icon icon="mdi:alert-circle" className={styles.icon} />
      <h1 className={styles.title}>{t('error.404.code')}</h1>
      <p className={styles.description}>{t('error.404.title')}</p>
      <p className={styles.description}>{t('error.404.description')}</p>
      <Link href="/" className={styles.homeLink}>
        {t('common.backToHome')}
      </Link>
    </div>
  );
}

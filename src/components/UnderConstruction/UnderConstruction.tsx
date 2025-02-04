'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import styles from './UnderConstruction.module.scss';

interface Props {
  title?: string;
  showHomeLink?: boolean;
}

export default function UnderConstruction({
  title,
  showHomeLink = true,
}: Props) {
  const { t } = useTranslationContext();

  return (
    <div className={styles.container}>
      <Icon icon="mdi:construction" className={styles.icon} />
      <h1 className={styles.title}>
        {title || t('common.pageUnderConstruction')}
      </h1>
      <p className={styles.description}>{t('common.comingSoon')}</p>
      {showHomeLink && (
        <Link href="/" className={styles.homeLink}>
          {t('common.backToHome')}
        </Link>
      )}
    </div>
  );
}

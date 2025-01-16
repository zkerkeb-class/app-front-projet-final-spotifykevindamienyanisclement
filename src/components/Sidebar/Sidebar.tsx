'use client';

import Link from 'next/link';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { t } = useTranslationContext();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.librarySection}>
        <div className={styles.libraryHeader}>
          <svg
            className={styles.libraryIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" />
          </svg>
          <span className={styles.libraryText}>{t('sidebar.library')}</span>
          <button
            type="button"
            className={styles.addButton}
            aria-label={t('sidebar.addPlaylist') as string}
          >
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" />
            </svg>
          </button>
        </div>

        <div className={styles.createPlaylistSection}>
          <h2 className={styles.sectionTitle}>
            {t('sidebar.createPlaylist.title')}
          </h2>
          <p className={styles.sectionDescription}>
            {t('sidebar.createPlaylist.description')}
          </p>
          <button type="button" className={styles.createButton}>
            {t('sidebar.createPlaylist.button')}
          </button>
        </div>

        <div className={styles.podcastSection}>
          <h2 className={styles.sectionTitle}>{t('sidebar.podcasts.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('sidebar.podcasts.description')}
          </p>
          <button type="button" className={styles.browseButton}>
            {t('sidebar.podcasts.button')}
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          <Link href="/legal" className={styles.footerLink}>
            {t('footer.legal')}
          </Link>
          <Link href="/privacy" className={styles.footerLink}>
            {t('footer.privacyCenter')}
          </Link>
          <Link href="/privacy-policy" className={styles.footerLink}>
            {t('footer.privacy')}
          </Link>
          <Link href="/cookies" className={styles.footerLink}>
            {t('footer.cookiesSettings')}
          </Link>
          <Link href="/about" className={styles.footerLink}>
            {t('footer.about')}
          </Link>
          <Link href="/accessibility" className={styles.footerLink}>
            {t('footer.accessibility')}
          </Link>
          <Link href="/cookies-page" className={styles.footerLink}>
            {t('footer.cookies')}
          </Link>
        </nav>
      </footer>
    </aside>
  );
}

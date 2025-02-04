'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useTheme } from '@/hooks/settings/useTheme';
import { usePlayerControls } from '@/hooks/ui/usePlayer';
import { normalizeImageUrl, storage } from '@/utils/tools';
import { STORAGE_KEYS, PREVIEW_COUNT } from '@/utils/contants/storage';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const { t } = useTranslationContext();
  const { theme } = useTheme();
  const { playlist, setPlaylist } = usePlayerControls();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.librarySection}>
        <div className={styles.libraryHeader}>
          <Image
            src="/assets/icons/library.svg"
            className={styles.libraryIcon}
            alt={t('sidebar.library')}
            width={36}
            height={36}
          />
          <span className={styles.libraryText}>{t('sidebar.library')}</span>
          <button
            type="button"
            className={styles.addButton}
            aria-label={t('sidebar.addPlaylist')}
          >
            <Image
              src={`/assets/icons/cross${theme === 'dark' ? '-white' : ''}.svg`}
              className={styles.addButtonIcon}
              alt={t('sidebar.addPlaylist')}
              width={24}
              height={24}
            />
          </button>
        </div>

        {playlist.length > 0 ? (
          <div className={styles.playlistsContainer}>
            <div className={styles.playlistHeader}>
              <div className={styles.playlistHeaderTop}>
                <span className={styles.playlistName}>
                  {t('playlist.name')}
                </span>
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => {
                    setPlaylist([]);
                    storage.set(STORAGE_KEYS.PLAYLIST, []);
                    storage.set(STORAGE_KEYS.CURRENT_INDEX, -1);
                  }}
                  aria-label={t('playlist.clear')}
                >
                  <Image
                    src={`/assets/icons/trash${theme === 'dark' ? '-white' : ''}.svg`}
                    alt={t('sidebar.trash')}
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            <div className={styles.tracksPreview}>
              {playlist.slice(0, PREVIEW_COUNT).map(track => (
                <Link
                  href="/spotify/playlist"
                  key={track.id}
                  className={styles.previewTrack}
                >
                  {track.album?.image?.formattedImageURL ||
                  track.artist?.image?.formattedImageURL ? (
                    <Image
                      src={normalizeImageUrl(
                        track.album?.image?.formattedImageURL ||
                          track.artist?.image?.formattedImageURL
                      )}
                      alt={track.title}
                      width={48}
                      height={48}
                      className={styles.trackCover}
                    />
                  ) : (
                    <div className={styles.defaultCover}>
                      <Image
                        src="/assets/images/default-album.png"
                        alt="Default album"
                        width={48}
                        height={48}
                      />
                    </div>
                  )}
                  <div className={styles.trackInfo}>
                    <span className={styles.trackTitle}>{track.title}</span>
                    <span className={styles.artistName}>
                      {track.artist?.name || 'Unknown Artist'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.seeMoreButtonContainer}>
              <Link href="/spotify/playlist" className={styles.seeMoreButton}>
                {t('playlist.see_more')}
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.createPlaylistSection}>
            <h2 className={styles.sectionTitle}>
              {t('sidebar.createPlaylist.title')}
            </h2>
            <p className={styles.sectionDescription}>
              {t('sidebar.createPlaylist.description')}
            </p>
            <Link href="/spotify/playlist" className={styles.createButton}>
              {t('sidebar.createPlaylist.button')}
            </Link>
          </div>
        )}

        <div className={styles.podcastSection}>
          <h2 className={styles.sectionTitle}>{t('sidebar.podcasts.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('sidebar.podcasts.description')}
          </p>
          <Link href="/spotify/podcast" className={styles.createButton}>
            {t('sidebar.podcasts.button')}
          </Link>
        </div>
      </div>

      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          <Link href="/other/about" className={styles.footerLink}>
            {t('other.about.title')}
          </Link>
          <Link href="/other/accessibility" className={styles.footerLink}>
            {t('other.accessibility.title')}
          </Link>
          <Link href="/other/legal" className={styles.footerLink}>
            {t('other.legal.title')}
          </Link>
          <Link href="/other/privacy" className={styles.footerLink}>
            {t('other.privacy.title')}
          </Link>
          <Link href="/other/privacy-policy" className={styles.footerLink}>
            {t('other.privacyPolicy.title')}
          </Link>
          <Link href="/other/cookies" className={styles.footerLink}>
            {t('other.cookies.title')}
          </Link>
        </nav>
      </footer>
    </aside>
  );
}

'use client';

// import { useParams } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import Image from 'next/image';
import { usePlayerControls } from '@/hooks/ui/usePlayer';
import { useState } from 'react';
import logger from '@/utils/logger';
import styles from './page.module.scss';

export default function TrackPage() {
  const { t } = useTranslationContext();
  const { isPlaying, play, pause } = usePlayerControls();
  const [imageError, setImageError] = useState(false);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            // src={`${track.album?.image?.formattedImageURL}`}
            src="/assets/images/default-album.jpg"
            // alt={`${track.title} - ${track.album?.title}` || 'Album'}
            alt="Album"
            width={232}
            height={232}
            className={styles.cover}
            onError={() => setImageError(true)}
          />
          <div className={styles.info}>
            <span className={styles.type}>{t('track.title')}</span>
            {/* <h1 className={styles.title}>{track.title}</h1> */}
            <h1 className={styles.title}>Track</h1>
            <div className={styles.meta}>
              <Image
                // src={`${track.artist?.image?.formattedImageURL}`}
                src="/assets/images/default-artist.jpg"
                // alt={track.artist?.name || 'Artist'}
                alt="Artist"
                width={28}
                height={28}
                className={styles.artistImage}
              />
              {/* <span className={styles.artist}>{track.artist?.name}</span> */}
              <span className={styles.artist}>Artist</span>
              <span className={styles.dot}>•</span>
              {/* <span className={styles.album}>{track.album?.title}</span> */}
              <span className={styles.album}>Album</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.playButton}
              onClick={isPlaying ? pause : play}
              aria-label={isPlaying ? t('player.pause') : t('player.play')}
            >
              <Image
                src={
                  isPlaying
                    ? '/assets/icons/pause.svg'
                    : '/assets/icons/play.svg'
                }
                alt={isPlaying ? 'Pause' : 'Play'}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

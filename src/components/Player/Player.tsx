'use client';

import { useState } from 'react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import Image from 'next/image';
import styles from './Player.module.scss';

export default function Player() {
  const { t } = useTranslationContext();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.player}>
      <div className={styles.songInfo}>
        <Image
          src="/placeholder-album.jpg"
          alt="Album cover"
          className={styles.albumCover}
          width={56}
          height={56}
        />
        <div className={styles.songDetails}>
          <h4 className={styles.songTitle}>Song Title</h4>
          <p className={styles.artistName}>Artist Name</p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.mainControls}>
          <button
            type="button"
            className={styles.shuffleButton}
            aria-label={t('player.shuffle')}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.playButton}
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? t('player.pause') : t('player.play')}
          >
            {isPlaying ? (
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.7 3a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm12.6 0a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1z" />
              </svg>
            ) : (
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
              </svg>
            )}
          </button>
        </div>
        <div className={styles.progressBar}>
          <span className={styles.time}>0:00</span>
          <div className={styles.progress}>
            <div className={styles.progressFill} />
          </div>
          <span className={styles.time}>3:45</span>
        </div>
      </div>

      <div className={styles.volumeControl}>
        <button
          type="button"
          className={styles.volumeButton}
          aria-label={t('player.volume')}
        >
          <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 2.838v18.324L7.543 16.716a1.2 1.2 0 0 0-1.697 0l-.111.111a1.2 1.2 0 0 0 0 1.697l7.172 7.172a1.2 1.2 0 0 0 1.697 0l7.172-7.172a1.2 1.2 0 0 0 0-1.697l-.111-.111a1.2 1.2 0 0 0-1.697 0l-4.447 4.446V2.838a1.2 1.2 0 0 0-1.2-1.2h-.157a1.2 1.2 0 0 0-1.2 1.2z" />
          </svg>
        </button>
        <div className={styles.volumeSlider}>
          <div className={styles.volumeFill} />
        </div>
      </div>
    </div>
  );
}

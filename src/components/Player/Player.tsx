'use client';

import { usePlayerControls } from '@/hooks/ui/usePlayer';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useTheme } from '@/hooks/settings/useTheme';
import Image from 'next/image';
import { convertDuration } from '@/utils/tools';
import styles from './Player.module.scss';

export default function Player() {
  const { t } = useTranslationContext();
  const { theme } = useTheme();
  const {
    isPlaying,
    isMuted,
    progress,
    duration,
    currentTime,
    currentTrackFull,
    volume,
    play,
    pause,
    stop,
    toggleMute,
    handleVolumeChange,
  } = usePlayerControls();

  const renderPlayButton = () => {
    const iconName = isPlaying ? 'pause' : 'play';
    const iconPath = `/assets/icons/${iconName}${
      theme === 'dark' ? '-white' : ''
    }.svg`;

    return (
      <Image
        src={iconPath}
        alt={isPlaying ? t('player.pause') : t('player.play')}
        width={24}
        height={24}
      />
    );
  };

  if (!currentTrackFull) {
    return null;
  }

  return (
    <div className={styles.player}>
      <div className={styles.songInfo}>
        <Image
          src={
            currentTrackFull?.album?.image?.formattedImageURL ||
            '/assets/images/default-album.jpg'
          }
          alt={t('player.albumCover')}
          className={styles.albumCover}
          width={56}
          height={56}
        />
        <div className={styles.songDetails}>
          <h4 className={styles.songTitle}>
            {currentTrackFull.title || t('player.noTrack')}
          </h4>
          <p className={styles.artistName}>
            {currentTrackFull.artist?.name || t('player.unknownArtist')}
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.mainControls}>
          <button type="button" onClick={stop} className={styles.controlButton}>
            <Image
              src={`/assets/icons/stop${theme === 'dark' ? '-white' : ''}.svg`}
              alt={t('player.stop')}
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            className={styles.playButton}
            onClick={isPlaying ? pause : play}
            aria-label={isPlaying ? t('player.pause') : t('player.play')}
          >
            {renderPlayButton()}
          </button>
        </div>

        <div className={styles.progressBar}>
          <span className={styles.time}>{convertDuration(currentTime)}</span>
          <div className={styles.progress}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.time}>{convertDuration(duration)}</span>
        </div>
      </div>

      <div className={styles.volumeControl}>
        <button
          type="button"
          className={styles.volumeButton}
          onClick={toggleMute}
        >
          <Image
            src={`/assets/icons/${isMuted ? 'volume-off' : 'volume'}${
              theme === 'dark' ? '-white' : ''
            }.svg`}
            alt={t('player.volume')}
            width={24}
            height={24}
          />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={e => handleVolumeChange(parseFloat(e.target.value))}
          className={styles.volumeSlider}
        />
      </div>
    </div>
  );
}

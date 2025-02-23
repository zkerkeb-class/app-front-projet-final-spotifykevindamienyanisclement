'use client';

import { useCallback, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import { useAlbumById } from '@/hooks/api/useAlbums';
import { usePlayerControls } from '@/hooks/ui/usePlayer';
import { useTheme } from '@/hooks/settings/useTheme';
import { Track } from '@/types/api/track';
import { normalizeImageUrl } from '@/utils/tools';
import logger from '@/utils/logger';
import styles from './page.module.scss';

export default function AlbumPage() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const { albumId } = useParams();
  const { album, loading, error } = useAlbumById(Number(albumId || 0));
  const { loadTrackFull, isPlaying, play, pause } = usePlayerControls();
  const { theme } = useTheme();
  const [albumImageError, setAlbumImageError] = useState(false);
  const [artistImageError, setArtistImageError] = useState(false);

  const handleTrackPlay = useCallback(
    (track: Track) => {
      if (track.sound) {
        loadTrackFull({
          id: track.id,
          title: track.title,
          soundId: track.soundId || 0,
          playlistId: track.playlistId || 0,
          albumId: album?.id || 0,
          album: album || null,
          playlist: null,
          artist: album?.artist || null,
          artistId: album?.artistId || 0,
          sound: {
            m4aSoundURL: track.sound.m4aSoundURL,
            originalSoundURL: track.sound.originalSoundURL,
            duration: track.sound.duration || 0,
            id: track.sound.id || 0,
            createdAt: track.sound.createdAt || new Date(),
            updatedAt: track.sound.updatedAt || new Date(),
          },
          createdAt: track.createdAt || new Date(),
          updatedAt: track.updatedAt || new Date(),
        });

        setTimeout(() => {
          play();
        }, 100);
      }
    },
    [album, loadTrackFull, play]
  );

  const handleAlbumPlay = useCallback(() => {
    if (album?.tracks?.[0]) {
      handleTrackPlay(album.tracks[0]);
    }
  }, [album, handleTrackPlay]);

  const handleTrackClick = useCallback(
    (trackId: number) => {
      router.push(`/spotify/album/${albumId}/track/${trackId}`);
    },
    [router, albumId]
  );

  const renderTracks = useMemo(() => {
    return album?.tracks?.map((track: Track, index: number) => (
      <div
        key={track.id}
        className={styles.trackItem}
        // onClick={() => handleTrackClick(track.id)}
        onClick={() => {
          logger.info('track.id', track.id);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            // handleTrackClick(track.id);
            logger.info('track.id', track.id);
          }
        }}
      >
        <div className={styles.trackNumber}>{index + 1}</div>
        <button
          type="button"
          className={styles.playButton}
          onClick={e => {
            e.stopPropagation();
            handleTrackPlay(track);
          }}
          aria-label={t('player.play')}
        >
          <Image
            src={`/assets/icons/play${theme === 'dark' ? '-white' : ''}.svg`}
            alt="Play"
            width={16}
            height={16}
          />
        </button>
        <div className={styles.trackInfo}>
          <span className={styles.trackTitle}>{track.title}</span>
        </div>
        <div className={styles.trackDuration}>
          {track.sound?.duration
            ? `${Math.floor(track.sound.duration / 60)}:${(
                track.sound.duration % 60
              )
                .toString()
                .padStart(2, '0')}`
            : ''}
        </div>
      </div>
    ));
  }, [album?.tracks, handleTrackPlay, t, theme]);

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>{t('common.loading')}</div>
      </MainLayout>
    );
  }

  if (error || !album) {
    return (
      <MainLayout>
        <div className={styles.error}>
          {error?.message || t('common.error')}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          {!albumImageError ? (
            <Image
              src={normalizeImageUrl(
                album?.image?.formattedImageURL || album?.image?.avifImageUrl
              )}
              alt={album.title}
              width={232}
              height={232}
              className={styles.albumCover}
              onError={() => setAlbumImageError(true)}
              priority
            />
          ) : (
            <div className={styles.albumCover} />
          )}
          <div className={styles.albumInfo}>
            <span className={styles.type}>{t('album.title')}</span>
            <h1 className={styles.title}>{album.title}</h1>
            <div className={styles.meta}>
              {!artistImageError ? (
                <Image
                  src={normalizeImageUrl(
                    album?.artist?.image?.formattedImageURL ||
                      album?.group?.image?.formattedImageURL
                  )}
                  alt={album.artist?.name || ''}
                  width={28}
                  height={28}
                  className={styles.artistImage}
                  onError={() => setArtistImageError(true)}
                />
              ) : (
                <div className={styles.artistImage} />
              )}
              <span className={styles.artist}>{album.artist?.name}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.year}>
                {new Date(album.createdAt).getFullYear()}
              </span>
              <span className={styles.dot}>•</span>
              <span className={styles.trackCount}>
                {album.tracks?.length} {t('album.tracks')}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.playButton}
              onClick={isPlaying ? pause : handleAlbumPlay}
              aria-label={isPlaying ? t('player.pause') : t('player.play')}
            >
              <Image
                src={`/assets/icons/${isPlaying ? 'pause' : 'play'}${
                  theme === 'dark' ? '-white' : ''
                }.svg`}
                className={styles.playIcon}
                alt={isPlaying ? 'Pause' : 'Play'}
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className={styles.trackList}>
            <div className={styles.trackHeader}>
              <div className={styles.numberHeader}>#</div>
              <div className={styles.titleHeader}>{t('album.track.title')}</div>
              <div className={styles.durationHeader}>
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" />
                  <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z" />
                </svg>
              </div>
            </div>
            {renderTracks}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

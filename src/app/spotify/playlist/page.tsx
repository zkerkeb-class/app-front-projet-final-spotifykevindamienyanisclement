'use client';

import { useTheme } from '@/hooks/settings/useTheme';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { usePlayerControls } from '@/hooks/ui/usePlayer';
import { normalizeImageUrl, storage } from '@/utils/tools';
import { STORAGE_KEYS } from '@/utils/contants/storage';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/Layout/MainLayout';
import { useCallback } from 'react';
import styles from './page.module.scss';

export default function PlaylistPage() {
  const { t } = useTranslationContext();
  const { theme } = useTheme();
  const { playlist, setPlaylist, loadPlaylist } = usePlayerControls();

  const handleRemoveTrack = (trackId: number) => {
    const newPlaylist = playlist.filter(track => track.id !== trackId);
    setPlaylist(newPlaylist);
    storage.set(STORAGE_KEYS.PLAYLIST, newPlaylist);
  };

  const formatDuration = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours} h ${minutes} min`;
    }
    return `${minutes} min ${seconds.toString().padStart(2, '0')} s`;
  }, []);

  const totalTracks = playlist.length;
  const totalDuration = playlist.reduce(
    (acc, track) => acc + (track.sound?.duration || 0),
    0
  );

  const handlePlayTrack = (index: number) => {
    loadPlaylist(playlist.slice(index));
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.playlistContent}>
          <div className={styles.playlistHeader}>
            <div className={styles.playlistCover}>
              {playlist[0]?.album?.image?.formattedImageURL ||
              playlist[0]?.artist?.image?.formattedImageURL ? (
                <Image
                  src={normalizeImageUrl(
                    playlist[0]?.album?.image?.formattedImageURL ||
                      playlist[0]?.artist?.image?.formattedImageURL
                  )}
                  alt="Playlist cover"
                  width={232}
                  height={232}
                />
              ) : (
                <div className={styles.emptyPlaylistCover}>
                  <Image
                    src="/assets/images/default-album.jpg"
                    alt="Default album"
                    width={64}
                    height={64}
                  />
                </div>
              )}
            </div>
            <div className={styles.playlistInfo}>
              <span className={styles.playlistType}>{t('playlist.type')}</span>
              <h1 className={styles.playlistName}>{t('playlist.name')}</h1>
              <div className={styles.playlistMeta} />
            </div>
          </div>

          {playlist.length > 0 ? (
            <div className={styles.trackList}>
              <div className={styles.trackListHeader}>
                <div className={styles.trackNumber}>#{totalTracks}</div>
                <div className={styles.trackTitle}>
                  {t('album.track.title')}
                </div>
                <div className={styles.albumName}>{t('album.track.album')}</div>
                <div className={styles.trackDuration}>
                  <Image
                    src={`/assets/icons/clock${theme === 'dark' ? '-white' : ''}.svg`}
                    alt="Duration"
                    width={16}
                    height={16}
                  />
                  {formatDuration(totalDuration)}
                </div>
              </div>

              {playlist.map((track, index) => (
                <div key={track.id} className={styles.trackItem}>
                  <div
                    className={styles.trackNumber}
                    onClick={() => handlePlayTrack(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={t('player.play')}
                  >
                    <span>{index + 1}</span>
                    <Image
                      src={`/assets/icons/play${theme === 'dark' ? '-white' : ''}.svg`}
                      alt={t('player.play')}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className={styles.trackTitleSection}>
                    {track.album?.image?.formattedImageURL ||
                    track.artist?.image?.formattedImageURL ? (
                      <Image
                        src={normalizeImageUrl(
                          track?.album?.image?.formattedImageURL ||
                            track?.artist?.image?.formattedImageURL
                        )}
                        alt={track.title}
                        width={40}
                        height={40}
                        className={styles.trackCover}
                      />
                    ) : (
                      <div className={styles.defaultCover}>
                        <Image
                          src="/assets/images/default-album.jpg"
                          alt="Default album"
                          width={40}
                          height={40}
                        />
                      </div>
                    )}
                    <div className={styles.trackInfo}>
                      <span className={styles.trackTitle}>{track.title}</span>
                      <span className={styles.artistName}>
                        {track.artist?.name || 'Unknown Artist'}
                      </span>
                    </div>
                  </div>
                  <div className={styles.albumName}>
                    {track.album?.title || 'Unknown Album'}
                  </div>
                  <div className={styles.trackActions}>
                    <span className={styles.trackDuration}>
                      {track.sound?.duration
                        ? `${Math.floor(track.sound.duration / 60)}:${String(
                            track.sound.duration % 60
                          ).padStart(2, '0')}`
                        : '--:--'}
                    </span>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => handleRemoveTrack(track.id)}
                      aria-label={t('playlist.removeTrack')}
                    >
                      <Image
                        src={`/assets/icons/trash${theme === 'dark' ? '-white' : ''}.svg`}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>{t('playlist.empty')}</p>
              <Link href="/" className={styles.addTracksButton}>
                {t('playlist.add_tracks')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

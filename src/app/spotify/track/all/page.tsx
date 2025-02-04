'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import Card from '@/components/Cards/Card/Card';
import { useTracks } from '@/hooks/api/useTracks';
import { usePlayerControls } from '@/hooks/ui/usePlayer';
import { Track } from '@/types/api/track';
import styles from './page.module.scss';

export default function AllTracksPage() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const { tracks, loading, error } = useTracks(undefined, 50);
  const { loadTrackFull, play } = usePlayerControls();

  const handleTrackPlay = useCallback(
    (track: Track) => {
      if (track.sound) {
        loadTrackFull({
          id: track.id,
          title: track.title,
          soundId: track.soundId || 0,
          playlistId: track.playlistId || 0,
          albumId: track.albumId || 0,
          album: track.album || null,
          playlist: null,
          artist: track.artist || null,
          artistId: track.artistId || 0,
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
    [loadTrackFull, play]
  );

  const handleTrackClick = useCallback(
    (albumId: number, trackId: number) => {
      router.push(`/spotify/album/${albumId}/track/${trackId}`);
    },
    [router]
  );

  const renderTracks = useMemo(() => {
    if (loading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (error) {
      return <div className={styles.error}>{error.message}</div>;
    }
    return tracks.map(track => (
      <Card
        key={track.id}
        type="track"
        title={track.title}
        description={track.artist?.name}
        imageUrl={track.album?.image?.formattedImageURL}
        href={`/spotify/album/${track.albumId}/track/${track.id}`}
        onPlay={() => handleTrackPlay(track)}
      />
    ));
  }, [tracks, loading, error, t, handleTrackPlay]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('album.track.all')}</h1>
        <div className={styles.grid}>{renderTracks}</div>
      </div>
    </MainLayout>
  );
}

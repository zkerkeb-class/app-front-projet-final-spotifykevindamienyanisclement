'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMostListenedPlaylist } from '@/hooks/api/usePlaylist';
import { useTranslationContext } from '@/providers/TranslationProvider';
import Card from '@/components/Cards/Card/Card';
import MainLayout from '@/components/Layout/MainLayout';
import { normalizeImageUrl } from '@/utils/tools';
import styles from './page.module.scss';

export default function MostListenedPlaylistPage() {
  const { t } = useTranslationContext();
  const router = useRouter();
  const { playlist, loading, error } = useMostListenedPlaylist();

  const handleTrackClick = useCallback(
    (albumId: number, trackId: number) => {
      router.push(`/spotify/album/${albumId}/track/${trackId}`);
    },
    [router]
  );

  const renderPlaylists = useMemo(() => {
    if (loading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (error) {
      return <div className={styles.error}>{error.message}</div>;
    }
    return playlist.map(item => (
      <Card
        key={item.id}
        type="album"
        title={item?.title}
        description={
          item?.artist?.name || item?.album?.title || t('player.unknownArtist')
        }
        imageUrl={normalizeImageUrl(item?.album?.image?.formattedImageURL)}
        href={`/spotify/album/${item?.albumId}`}
        onPlay={() => handleTrackClick(item?.albumId, item?.soundId)}
      />
    ));
  }, [playlist, loading, error, t, handleTrackClick]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('home.mostListenedTracks')}</h1>
        <div className={styles.grid}>{renderPlaylists}</div>
      </div>
    </MainLayout>
  );
}

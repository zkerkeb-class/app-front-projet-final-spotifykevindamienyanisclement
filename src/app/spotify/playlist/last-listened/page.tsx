'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLastListenedPlaylist } from '@/hooks/api/usePlaylist';
import { useTranslationContext } from '@/providers/TranslationProvider';
import Card from '@/components/Cards/Card/Card';
import MainLayout from '@/components/Layout/MainLayout';
import { normalizeImageUrl } from '@/utils/tools';
import styles from './page.module.scss';

export default function LastListenedPlaylistPage() {
  const { t } = useTranslationContext();
  const router = useRouter();
  const { playlist, loading, error } = useLastListenedPlaylist();

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
        title={item?.track?.title}
        description={
          item?.track?.artist?.name ||
          item?.track?.album?.title ||
          t('player.unknownArtist')
        }
        imageUrl={normalizeImageUrl(
          item?.track?.album?.image?.formattedImageURL
        )}
        href={`/spotify/album/${item?.track?.albumId}/track/${item?.track?.id}`}
        onPlay={() => handleTrackClick(item?.track?.albumId, item?.track?.id)}
      />
    ));
  }, [playlist, loading, error, t, handleTrackClick]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('home.lastListenedTracks')}</h1>
        <div className={styles.grid}>{renderPlaylists}</div>
      </div>
    </MainLayout>
  );
}

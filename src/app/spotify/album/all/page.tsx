'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import Card from '@/components/Cards/Card/Card';
import { useAlbums } from '@/hooks/api/useAlbums';
import { normalizeImageUrl } from '@/utils/tools';
import styles from './page.module.scss';

export default function AllAlbumsPage() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const { albums, loading, error } = useAlbums(50);

  const handleAlbumClick = useCallback(
    (albumId: number) => {
      router.push(`/spotify/album/${albumId}`);
    },
    [router]
  );

  const renderAlbums = useMemo(() => {
    if (loading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (error) {
      return <div className={styles.error}>{error.message}</div>;
    }
    return albums.map(album => (
      <Card
        key={album.id}
        type="album"
        title={album.title}
        description={album.artistId?.toString()}
        imageUrl={normalizeImageUrl(album?.image?.formattedImageURL)}
        href={`/spotify/album/${album.id}`}
        onPlay={() => handleAlbumClick(album.id)}
      />
    ));
  }, [albums, loading, error, t, handleAlbumClick]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('album.all')}</h1>
        <div className={styles.grid}>{renderAlbums}</div>
      </div>
    </MainLayout>
  );
}

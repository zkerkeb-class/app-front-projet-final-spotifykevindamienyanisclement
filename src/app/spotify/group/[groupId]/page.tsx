'use client';

import { useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import { useGroupById } from '@/hooks/api/useGroups';
import { useTheme } from '@/hooks/settings/useTheme';
import Card from '@/components/Cards/Card/Card';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import styles from './page.module.scss';

export default function GroupDetailPage() {
  const router = useRouter();
  const { groupId } = useParams();
  const { t } = useTranslationContext();
  const { theme } = useTheme();
  const { group, loading, error } = useGroupById(Number(groupId));

  const handleArtistClick = useCallback(
    (artistId: number) => {
      router.push(`/spotify/artist/${artistId}`);
    },
    [router]
  );

  const handleAlbumClick = useCallback(
    (albumId: number) => {
      router.push(`/spotify/album/${albumId}`);
    },
    [router]
  );

  const renderArtists = useMemo(() => {
    return group?.artists?.map(artist => (
      <Card
        key={artist.id}
        type="artist"
        title={artist.name}
        imageUrl={artist.image?.formattedImageURL}
        href={`/spotify/artist/${artist.id}`}
        onPlay={() => handleArtistClick(artist.id)}
      />
    ));
  }, [group?.artists, handleArtistClick]);

  const renderAlbums = useMemo(() => {
    return group?.albums?.map(album => (
      <Card
        key={album.id}
        type="album"
        title={album.title}
        description={album.artist?.name}
        imageUrl={album.image?.formattedImageURL}
        href={`/spotify/album/${album.id}`}
        onPlay={() => handleAlbumClick(album.id)}
      />
    ));
  }, [group?.albums, handleAlbumClick]);

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>{t('common.loading')}</div>
      </MainLayout>
    );
  }

  if (error || !group) {
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
          <Image
            src={group.image?.formattedImageURL}
            alt={group.name}
            width={232}
            height={232}
            className={styles.cover}
          />
          <div className={styles.info}>
            <span className={styles.type}>{t('group.type')}</span>
            <h1 className={styles.title}>{group.name}</h1>
            <div className={styles.meta}>
              <span className={styles.memberCount}>
                {t('group.members').replace(
                  '{{count}}',
                  (group.artists?.length || 0).toString()
                )}
              </span>
              <span className={styles.dot}>•</span>
              <span className={styles.albumCount}>
                {t('group.albums').replace(
                  '{{count}}',
                  (group.albums?.length || 0).toString()
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('group.artists')}</h2>
            </div>
            <HorizontalScroll>{renderArtists}</HorizontalScroll>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('group.albums')}</h2>
            </div>
            <HorizontalScroll>{renderAlbums}</HorizontalScroll>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

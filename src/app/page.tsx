'use client';

import { useRef } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useTranslationContext } from '@/providers/TranslationProvider';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import { useRouter } from 'next/navigation';
import Card from '@/components/Cards/Card/Card';
import { useAlbums } from '@/hooks/api/useAlbums';
import { useArtists } from '@/hooks/api/useArtists';
import { useTracks } from '@/hooks/api/useTracks';
import styles from './page.module.scss';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { albums, loading: albumsLoading, error: albumsError } = useAlbums(10);
  const {
    artists,
    loading: artistsLoading,
    error: artistsError,
  } = useArtists(10);
  const { tracks, loading: tracksLoading, error: tracksError } = useTracks(10);

  const handleTrackClick = (albumId: number, trackId: number) => {
    router.push(`/spotify/album/${albumId}/track/${trackId}`);
  };

  const handleArtistClick = (artistName: string) => {
    router.push(`/spotify/artist/${artistName}`);
  };

  const handleAlbumClick = (albumId: number) => {
    router.push(`/spotify/album/${albumId}`);
  };

  const renderTracks = () => {
    if (tracksLoading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (tracksError) {
      return <div className={styles.error}>{tracksError.message}</div>;
    }
    return tracks.map(track => (
      <Card
        key={track.id}
        type="track"
        title={track.title}
        description={track.artistId?.toString()}
        // TODO: fix this
        // imageUrl={track.album?.image?.url || '/assets/images/default-album.jpg'}
        imageUrl="/assets/images/default-album.jpg"
        href={`/spotify/album/${track.albumId}/track/${track.id}`}
        onPlay={() => handleTrackClick(track.albumId, track.id)}
      />
    ));
  };

  const renderArtists = () => {
    if (artistsLoading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (artistsError) {
      return <div className={styles.error}>{artistsError.message}</div>;
    }
    return artists.map(artist => (
      <Card
        key={artist.id}
        type="artist"
        title={artist.name}
        // TODO: fix this
        // imageUrl={artist.image?.url || '/assets/images/default-artist.jpg'}
        imageUrl="/assets/images/default-artist.jpg"
        href={`/spotify/artist/${artist.name}`}
        onPlay={() => handleArtistClick(artist.name)}
      />
    ));
  };

  const renderAlbums = () => {
    if (albumsLoading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (albumsError) {
      return <div className={styles.error}>{albumsError.message}</div>;
    }
    return albums.map(album => (
      <Card
        key={album.id}
        type="album"
        title={album.title}
        description={album.artistId?.toString()}
        // TODO: fix this
        // imageUrl={album.image?.url || '/assets/images/default-album.jpg'}
        imageUrl="/assets/images/default-album.jpg"
        href={`/spotify/album/${album.id}`}
        onPlay={() => handleAlbumClick(album.id)}
      />
    ));
  };

  return (
    <MainLayout>
      <div className={styles.container} ref={scrollContainerRef}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.topTracks')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>{renderTracks()}</HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.popularArtists')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>{renderArtists()}</HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.recentAlbums')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>{renderAlbums()}</HorizontalScroll>
        </section>
      </div>
    </MainLayout>
  );
}

'use client';

import { useRef, useCallback, useMemo } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useTranslationContext } from '@/providers/TranslationProvider';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import { useRouter } from 'next/navigation';
import Card from '@/components/Cards/Card/Card';
import { useAlbums } from '@/hooks/api/useAlbums';
import { useArtists } from '@/hooks/api/useArtists';
import { useTracks } from '@/hooks/api/useTracks';
import { useGroups } from '@/hooks/api/useGroups';
import { usePlayerControls } from '@/hooks/ui/usePlayer';
import Link from 'next/link';
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
  const {
    tracks,
    loading: tracksLoading,
    error: tracksError,
  } = useTracks(undefined, 10);
  const { groups, loading: groupsLoading, error: groupsError } = useGroups(10);
  const { loadTrackFull } = usePlayerControls();

  const handleTrackClick = useCallback(
    (albumId: number, trackId: number) => {
      router.push(`/spotify/album/${albumId}/track/${trackId}`);
    },
    [router]
  );

  const handleArtistClick = useCallback(
    (artistId: number) => {
      router.push(`/spotify/artist/${artistId}`);
    },
    [router]
  );

  const handleGroupClick = useCallback(
    (groupId: number) => {
      router.push(`/spotify/group/${groupId}`);
    },
    [router]
  );

  const handleAlbumClick = useCallback(
    (albumId: number) => {
      router.push(`/spotify/album/${albumId}`);
    },
    [router]
  );

  const renderTracks = useMemo(() => {
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
        imageUrl={`${track.album.image.formattedImageURL}`}
        href={`/spotify/album/${track.albumId}/track/${track.id}`}
        onPlay={() => {
          if (track.sound) {
            loadTrackFull({
              ...track,
              soundId: track.soundId || 0,
              playlistId: track.playlistId || 0,
              album: null,
              playlist: null,
              artist: null,
              artistId: track.artistId || 0,
              sound: {
                m4aSoundURL: track.sound.m4aSoundURL,
                originalSoundURL: track.sound.originalSoundURL,
              },
            });
          }
        }}
      />
    ));
  }, [tracks, tracksLoading, tracksError, t, loadTrackFull]);

  const renderArtistsAndGroups = useMemo(() => {
    if (artistsLoading || groupsLoading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (artistsError || groupsError) {
      return <div className={styles.error}>{t('common.error')}</div>;
    }
    return (
      <>
        {artists.slice(0, 5).map(artist => (
          <Card
            key={`artist-${artist.id}`}
            type="artist"
            title={artist.name}
            imageUrl={`${artist.image.formattedImageURL}`}
            href={`/spotify/artist/${artist.id}`}
            onPlay={() => handleArtistClick(artist.id)}
          />
        ))}
        {groups.slice(0, 5).map(group => (
          <Card
            key={`group-${group.id}`}
            type="group"
            title={group.name}
            imageUrl={`${group.image.formattedImageURL}`}
            href={`/spotify/group/${group.id}`}
            onPlay={() => handleGroupClick(group.id)}
          />
        ))}
      </>
    );
  }, [
    artists,
    groups,
    artistsLoading,
    groupsLoading,
    artistsError,
    groupsError,
    t,
    handleArtistClick,
    handleGroupClick,
  ]);

  const renderAlbums = useMemo(() => {
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
        imageUrl={`${album.image.formattedImageURL}`}
        href={`/spotify/album/${album.id}`}
        onPlay={() => handleAlbumClick(album.id)}
      />
    ));
  }, [albums, albumsLoading, albumsError, t, handleAlbumClick]);

  return (
    <MainLayout>
      <div className={styles.container} ref={scrollContainerRef}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.topTracks')}</h2>
            <Link href="/spotify/track/all" className={styles.showAllButton}>
              {t('common.showAll')}
            </Link>
          </div>
          <HorizontalScroll>{renderTracks}</HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.popularArtists')}</h2>
            <Link href="/spotify/artist/all" className={styles.showAllButton}>
              {t('common.showAll')}
            </Link>
          </div>
          <HorizontalScroll>{renderArtistsAndGroups}</HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.recentAlbums')}</h2>
            <Link href="/spotify/album/all" className={styles.showAllButton}>
              {t('common.showAll')}
            </Link>
          </div>
          <HorizontalScroll>{renderAlbums}</HorizontalScroll>
        </section>
      </div>
    </MainLayout>
  );
}

'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import Card from '@/components/Cards/Card/Card';
import { useArtistById } from '@/hooks/api/useArtists';
import { usePlayerControls } from '@/hooks/ui/usePlayer';
import { useCallback } from 'react';
import logger from '@/utils/logger';
import { normalizeImageUrl } from '@/utils/tools';
import Link from 'next/link';
import styles from './page.module.scss';

export default function ArtistPage() {
  const router = useRouter();
  const { id } = useParams();
  const { t } = useTranslationContext();
  const { artist, loading, error } = useArtistById(Number(id));
  const { loadTrackFull, isPlaying, play, currentTrackFull } =
    usePlayerControls();

  const handleTrackPlay = useCallback(
    (track: any) => {
      if (track.sound) {
        logger.info('Track to play:', {
          url: track.sound.m4aSoundURL || track.sound.originalSoundURL,
          track,
        });

        loadTrackFull({
          id: track.id,
          title: track.title,
          soundId: track.soundId || 0,
          playlistId: track.playlistId || 0,
          albumId: track.albumId || 0,
          album: track.album || null,
          playlist: null,
          artist: artist || null,
          artistId: artist?.id || 0,
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
      } else {
        logger.error('No sound data available for track:', track);
      }
    },
    [artist, loadTrackFull, play]
  );

  const handleArtistPlay = useCallback(() => {
    if (artist?.tracks?.[0]) {
      handleTrackPlay(artist.tracks[0]);
    }
  }, [artist, handleTrackPlay]);

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>{t('common.loading')}</div>
      </MainLayout>
    );
  }

  if (error || !artist) {
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
          <div className={styles.artistImage}>
            <Image
              src={normalizeImageUrl(artist?.image?.formattedImageURL)}
              alt={artist.name}
              fill
              className={styles.image}
              loading="lazy"
            />
          </div>
          <div className={styles.artistInfo}>
            <h1 className={styles.name}>
              {artist.name || t('player.unknownArtist')}
            </h1>
            {artist.group && (
              <div className={styles.group}>
                <Link href={`/spotify/group/${artist.group.id}`}>
                  <p className={styles.groupName}>
                    {t('artist.group')} - {artist.group.name}
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.playButton}
              onClick={handleArtistPlay}
              aria-label={isPlaying ? t('player.pause') : t('player.play')}
            >
              <Image
                src={`/assets/icons/${isPlaying ? 'pause' : 'play'}.svg`}
                alt={isPlaying ? 'Pause' : 'Play'}
                width={32}
                height={32}
              />
            </button>
            <button type="button" className={styles.followButton}>
              {t('artist.follow')}
            </button>
          </div>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('artist.popular')}</h2>
            </div>
            <div className={styles.popularTracks}>
              <div className={styles.trackList}>
                {artist.tracks?.map((track, index) => (
                  <div
                    key={track.id}
                    className={styles.trackItem}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleTrackPlay(track);
                      }
                    }}
                  >
                    <span className={styles.trackNumber}>{index + 1}</span>
                    <div className={styles.playButtonContainer}>
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
                          src={`/assets/icons/${
                            isPlaying && currentTrackFull?.id === track.id
                              ? 'pause'
                              : 'play'
                          }-white.svg`}
                          alt={
                            isPlaying && currentTrackFull?.id === track.id
                              ? t('player.pause')
                              : t('player.play')
                          }
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                    <div className={styles.trackInfo}>
                      <span className={styles.trackTitle}>{track.title}</span>
                      <span className={styles.trackStats}>
                        {track.playCount?.toLocaleString()}
                      </span>
                    </div>
                    <span className={styles.trackDuration}>
                      {track.sound?.duration
                        ? `${Math.floor(track.sound.duration / 60)}:${(
                            track.sound.duration % 60
                          )
                            .toString()
                            .padStart(2, '0')}`
                        : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('artist.discography')}</h2>
              <button
                type="button"
                className={styles.showAllButton}
                onClick={() => router.push(`/spotify/artist/${id}/albums`)}
              >
                {t('common.showAll')}
              </button>
            </div>
            <HorizontalScroll>
              {artist.albums?.map(album => (
                <Card
                  key={album.id}
                  type="album"
                  title={album.title}
                  description={`${album.type} • ${new Date(album.createdAt).getFullYear()}`}
                  imageUrl={normalizeImageUrl(album?.image?.formattedImageURL)}
                  href={`/spotify/album/${album.id}`}
                />
              ))}
            </HorizontalScroll>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('artist.group')}</h2>
            </div>
            <HorizontalScroll>
              {artist.group && (
                <Card
                  key={artist.group.id}
                  type="group"
                  title={artist.group.name}
                  href={`/spotify/group/${artist.group.id}`}
                  imageUrl={normalizeImageUrl(
                    artist.group?.image?.formattedImageURL
                  )}
                />
              )}
            </HorizontalScroll>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

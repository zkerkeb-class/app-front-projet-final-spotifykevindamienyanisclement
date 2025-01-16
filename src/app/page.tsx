'use client';

import { useRef } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useTranslationContext } from '@/providers/TranslationProvider';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
// import ArtistCard from '@/components/Cards/ArtistCard';
// import TrackCard from '@/components/Cards/TrackCard';
// import AlbumCard from '@/components/Cards/AlbumCard';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

// Données mockées (à remplacer par des appels API)
const topTracks = [
  { id: 1, title: 'TOKI', albumId: 1 },
  { id: 2, title: 'ENCORE PLUS FORT ELLE AIME ÇA', albumId: 1 },
  { id: 3, title: 'LA BELLE ET LA BÊTE', albumId: 1 },
];

const popularArtists = [
  { id: 1, name: 'GIMS', type: 'Artiste', image: '/artists/gims.jpg' },
  { id: 2, name: 'Gazo', type: 'Artiste', image: '/artists/gazo.jpg' },
  { id: 3, name: 'Gazo', type: 'Artiste', image: '/artists/gazo.jpg' },
  { id: 4, name: 'Gazo', type: 'Artiste', image: '/artists/gazo.jpg' },
  { id: 5, name: 'Gazo', type: 'Artiste', image: '/artists/gazo.jpg' },
];

const recentAlbums = [
  {
    id: 1,
    title: 'Les Derniers Survivants',
    artist: 'GIMS',
    cover: '/albums/gims-lds.jpg',
  },
  { id: 2, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 3, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 4, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 5, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 6, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 7, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 8, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 9, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
  { id: 10, title: 'KMT', artist: 'Gazo', cover: '/albums/gazo-kmt.jpg' },
];

export default function Home() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTrackClick = (albumId: number, trackId: number) => {
    router.push(`/album/${albumId}/track/${trackId}`);
  };

  const handleArtistClick = (artistName: string) => {
    router.push(`/artist/${artistName}`);
  };

  const handleAlbumClick = (albumId: number) => {
    router.push(`/album/${albumId}`);
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
          <HorizontalScroll>
            {/* TODO: Transform in component */}
            {topTracks.map(track => (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track.albumId, track.id)}
                className={styles.trackItem}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTrackClick(track.albumId, track.id);
                  }
                }}
              >
                {track.title}
              </div>
            ))}
          </HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.popularArtists')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>
            {/* TODO: Transform in component */}
            {popularArtists.map(artist => (
              <div
                key={artist.id}
                onClick={() => handleArtistClick(artist.name)}
                className={styles.artistItem}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleArtistClick(artist.name);
                  }
                }}
              >
                {artist.name}
              </div>
            ))}
          </HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('home.recentAlbums')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>
            {/* TODO: Transform in component */}
            {recentAlbums.map(album => (
              <div
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
                className={styles.albumItem}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAlbumClick(album.id);
                  }
                }}
              >
                {album.title}
              </div>
            ))}
          </HorizontalScroll>
        </section>
      </div>
    </MainLayout>
  );
}

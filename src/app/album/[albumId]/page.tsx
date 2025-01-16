'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import styles from './page.module.scss';

// Données mockées (à remplacer par un appel API)
const albumData = {
  id: 1,
  title: 'APOCALYPSE',
  artist: 'Gazo',
  releaseYear: '2024',
  trackCount: '15 titres',
  duration: '49 min 6s',
  cover: '/albums/apocalypse.jpg',
  tracks: [
    { id: 1, title: 'TOKI', duration: '3:26', explicit: true },
    {
      id: 2,
      title: 'ENCORE PLUS FORT ELLE AIME ÇA',
      duration: '3:02',
      explicit: true,
    },
    { id: 3, title: 'LA BELLE ET LA BÊTE', duration: '3:14', explicit: true },
    { id: 4, title: 'LA BELLE ET LA BÊTE', duration: '3:14', explicit: true },
    { id: 5, title: 'LA BELLE ET LA BÊTE', duration: '3:14', explicit: true },
    { id: 6, title: 'LA BELLE ET LA BÊTE', duration: '3:14', explicit: true },
  ],
};

export default function AlbumPage() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const { albumId } = useParams();

  const handleTrackClick = (trackId: number) => {
    router.push(`/album/${albumId}/track/${trackId}`);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            src={albumData.cover}
            alt={albumData.title}
            width={232}
            height={232}
            className={styles.albumCover}
          />
          <div className={styles.albumInfo}>
            <span className={styles.type}>{t('album.title')}</span>
            <h1 className={styles.title}>{albumData.title}</h1>
            <div className={styles.meta}>
              <Image
                src="/artists/gazo.jpg"
                alt={albumData.artist}
                width={28}
                height={28}
                className={styles.artistImage}
              />
              <button
                type="button"
                onClick={() => router.push(`/artist/${albumData.artist}`)}
                className={styles.artist}
              >
                {albumData.artist}
              </button>
              <span className={styles.dot}>•</span>
              <span className={styles.year}>{albumData.releaseYear}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.trackCount}>{albumData.trackCount}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.duration}>{albumData.duration}</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.controls} aria-label="Controls">
            <button
              type="button"
              className={styles.playButton}
              aria-label="Play"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </button>
          </div>

          <div className={styles.trackList}>
            <div className={styles.trackHeader}>
              <div className={styles.numberHeader}>#</div>
              <div className={styles.titleHeader}>{t('album.track.title')}</div>
              <div className={styles.durationHeader}>
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" />
                  <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z" />
                </svg>
              </div>
            </div>

            {albumData.tracks.map((track, index) => (
              <div
                key={track.id}
                className={styles.trackItem}
                onClick={() => handleTrackClick(track.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleTrackClick(track.id);
                  }
                }}
              >
                <div className={styles.trackNumber}>{index + 1}</div>
                <div className={styles.trackInfo}>
                  <span className={styles.trackTitle}>{track.title}</span>
                  {track.explicit && <span className={styles.explicit}>E</span>}
                </div>
                <div className={styles.trackDuration}>{track.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

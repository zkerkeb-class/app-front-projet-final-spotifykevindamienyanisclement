'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import Card from '@/components/Cards/Card/Card';
import styles from './page.module.scss';

// Données mockées (à remplacer par des appels API)
const artistData = {
  id: 1,
  name: 'GIMS',
  verified: true,
  monthlyListeners: '15,265,677',
  rank: '#48',
  imageUrl: '/artists/gims.jpg',
  popularTracks: [
    {
      id: 1,
      title: 'SOIS PAS TIMIDE',
      plays: '124,515,777',
      duration: '2:45',
    },
    {
      id: 2,
      title: 'SPIDER',
      plays: '172,477,426',
      duration: '3:08',
    },
    {
      id: 3,
      title: 'CIEL',
      plays: '27,721,930',
      duration: '3:06',
    },
    {
      id: 4,
      title: "Est-ce que tu m'aimes ? - Pilule bleue",
      plays: '364,783,609',
      duration: '3:57',
    },
    {
      id: 5,
      title: 'Seya',
      plays: '241,566,898',
      duration: '3:08',
    },
  ],
  albums: [
    {
      id: 1,
      title: 'Les Derniers Survivants',
      type: 'Album',
      imageUrl: '/albums/gims-lds.jpg',
      year: '2023',
    },
    {
      id: 2,
      title: 'Le Fléau',
      type: 'Album',
      imageUrl: '/albums/le-fleau.jpg',
      year: '2020',
    },
  ],
  tours: [
    {
      id: 1,
      date: '15 juin 2024',
      venue: 'Stade de France, Paris',
      city: 'Paris, France',
    },
    {
      id: 2,
      date: '22 juin 2024',
      venue: 'Orange Vélodrome, Marseille',
      city: 'Marseille, France',
    },
  ],
};

export default function ArtistPage() {
  const { id } = useParams();
  const { t } = useTranslationContext();

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.artistImage}>
            <Image
              src={artistData.imageUrl}
              alt={artistData.name}
              fill
              className={styles.image}
              priority
            />
          </div>
          <div className={styles.artistInfo}>
            {artistData.verified && (
              <div className={styles.verified}>
                <Icon
                  icon="material-symbols:verified"
                  width={24}
                  height={24}
                  className={styles.verifiedIcon}
                />
                {t('artist.verified')}
              </div>
            )}
            <h1 className={styles.name}>{artistData.name}</h1>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <Icon icon="material-symbols:group" width={20} height={20} />
                {artistData.monthlyListeners} {t('artist.monthlyListeners')}
              </div>
              <div className={styles.stat}>
                <Icon
                  icon="material-symbols:trending-up"
                  width={20}
                  height={20}
                />
                {t('artist.worldRank')} {artistData.rank}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.actions}>
            <button type="button" className={styles.playButton}>
              <Icon
                icon="material-symbols:play-arrow-rounded"
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
                {artistData.popularTracks.map((track, index) => (
                  <div key={track.id} className={styles.trackItem}>
                    <span className={styles.trackNumber}>{index + 1}</span>
                    <div className={styles.trackInfo}>
                      <span className={styles.trackTitle}>{track.title}</span>
                      <span className={styles.trackStats}>{track.plays}</span>
                    </div>
                    <span className={styles.trackDuration}>
                      {track.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('artist.discography')}</h2>
              <button type="button" className={styles.showAllButton}>
                {t('common.showAll')}
              </button>
            </div>
            <HorizontalScroll>
              {artistData.albums.map(album => (
                <Card
                  key={album.id}
                  type="album"
                  title={album.title}
                  description={`${album.type} • ${album.year}`}
                  imageUrl={album.imageUrl}
                  href={`/spotify/album/${album.id}`}
                />
              ))}
            </HorizontalScroll>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('artist.tours')}</h2>
              <button type="button" className={styles.showAllButton}>
                {t('common.showAll')}
              </button>
            </div>
            <div className={styles.tours}>
              <div className={styles.tourList}>
                {artistData.tours.map(tour => (
                  <div key={tour.id} className={styles.tourItem}>
                    <div className={styles.tourInfo}>
                      <div className={styles.date}>{tour.date}</div>
                      <div className={styles.venue}>
                        {tour.venue} • {tour.city}
                      </div>
                    </div>
                    <button type="button" className={styles.ticketButton}>
                      {t('artist.tickets')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

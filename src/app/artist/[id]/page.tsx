'use client';

import { useParams } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import styles from './page.module.scss';

export default function ArtistPage() {
  const { t } = useTranslationContext();
  const { id } = useParams();

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>
          {t('album.track.artist')} {id}
        </h1>
        {/* Contenu de l'artiste */}
      </div>
    </MainLayout>
  );
}

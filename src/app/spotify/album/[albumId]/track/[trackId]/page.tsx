'use client';

import { useParams } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import styles from './page.module.scss';

export default function TrackPage() {
  const { albumId, trackId } = useParams();
  const { t } = useTranslationContext();

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>
          {t('album.track.title')} {trackId} from {t('album.title')} {albumId}
        </h1>
        {/* Contenu de la piste */}
      </div>
    </MainLayout>
  );
}

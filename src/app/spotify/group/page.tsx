'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import GroupCard from '@/components/Cards/GroupCard/GroupCard';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import styles from './page.module.scss';

// Données mockées (à remplacer par des appels API)
const featuredGroups = [
  {
    id: 1,
    name: 'Rock Classics',
    memberCount: 1500,
    imageUrl: '/groups/rock-classics.jpg',
    description: 'Les plus grands classiques du rock',
  },
  {
    id: 2,
    name: 'Jazz Lovers',
    memberCount: 800,
    imageUrl: '/groups/jazz-lovers.jpg',
    description: 'Pour les passionnés de jazz',
  },
  // Ajoutez d'autres groupes...
];

const newGroups = [
  // Similaire à featuredGroups...
  {
    id: 1,
    name: 'Rock tata',
    memberCount: 1500,
    imageUrl: '/groups/rock-classics.jpg',
    description: 'Les plus grands classiques du rock',
  },
  {
    id: 2,
    name: 'Jazz Lovers',
    memberCount: 800,
    imageUrl: '/groups/jazz-lovers.jpg',
    description: 'Pour les passionnés de jazz',
  },
  // Ajoutez d'autres groupes...
];

const recommendedGroups = [
  // Similaire à featuredGroups...
  {
    id: 1,
    name: 'Rock coucou',
    memberCount: 1500,
    imageUrl: '/groups/rock-classics.jpg',
    description: 'Les plus grands classiques du rock',
  },
  {
    id: 2,
    name: 'Jazz Lovers',
    memberCount: 800,
    imageUrl: '/groups/jazz-lovers.jpg',
    description: 'Pour les passionnés de jazz',
  },
  // Ajoutez d'autres groupes...
];

export default function GroupPage() {
  const { t } = useTranslationContext();

  return (
    <MainLayout>
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('group.featured')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>
            {featuredGroups.map(group => (
              <GroupCard key={group.id} {...group} />
            ))}
          </HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('group.new')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>
            {newGroups.map(group => (
              <GroupCard key={group.id} {...group} />
            ))}
          </HorizontalScroll>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('group.recommended')}</h2>
            <button type="button" className={styles.showAllButton}>
              {t('common.showAll')}
            </button>
          </div>
          <HorizontalScroll>
            {recommendedGroups.map(group => (
              <GroupCard key={group.id} {...group} />
            ))}
          </HorizontalScroll>
        </section>
      </div>
    </MainLayout>
  );
}

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import GroupCard from '@/components/Cards/GroupCard/GroupCard';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import { useGroups } from '@/hooks/api/useGroups';
import styles from './page.module.scss';

export default function GroupPage() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const {
    groups: featuredGroups,
    loading: featuredLoading,
    error: featuredError,
  } = useGroups(5);
  const {
    groups: newGroups,
    loading: newLoading,
    error: newError,
  } = useGroups(5);
  const {
    groups: recommendedGroups,
    loading: recommendedLoading,
    error: recommendedError,
  } = useGroups(5);

  const handleGroupClick = useCallback(
    (groupId: number) => {
      router.push(`/spotify/group/${groupId}`);
    },
    [router]
  );

  const renderGroupSection = (
    groups: any[],
    loading: boolean,
    error: any,
    title: string
  ) => {
    if (loading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (error) {
      return <div className={styles.error}>{error.message}</div>;
    }
    return (
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t(title)}</h2>
          <button
            type="button"
            className={styles.showAllButton}
            onClick={() => router.push('/spotify/group/all')}
          >
            {t('common.showAll')}
          </button>
        </div>
        <HorizontalScroll>
          {groups.map(group => (
            <GroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              memberCount={group.memberCount}
              imageUrl={`${group.image?.formattedImageURL}`}
              onClick={() => handleGroupClick(group.id)}
            />
          ))}
        </HorizontalScroll>
      </section>
    );
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        {renderGroupSection(
          featuredGroups,
          featuredLoading,
          featuredError,
          'group.featured'
        )}
        {renderGroupSection(newGroups, newLoading, newError, 'group.new')}
        {renderGroupSection(
          recommendedGroups,
          recommendedLoading,
          recommendedError,
          'group.recommended'
        )}
      </div>
    </MainLayout>
  );
}

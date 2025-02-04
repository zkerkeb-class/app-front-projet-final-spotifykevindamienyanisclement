'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import Card from '@/components/Cards/Card/Card';
import { useArtists } from '@/hooks/api/useArtists';
import { useGroups } from '@/hooks/api/useGroups';
import { normalizeImageUrl } from '@/utils/tools';
import Image from 'next/image';
import { useTheme } from '@/hooks/settings/useTheme';
import styles from './page.module.scss';

export default function AllArtistsPage() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const { theme } = useTheme();
  const [isArtistsExpanded, setIsArtistsExpanded] = useState(true);
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(true);

  const {
    artists,
    loading: artistsLoading,
    error: artistsError,
  } = useArtists();
  const { groups, loading: groupsLoading, error: groupsError } = useGroups();

  const toggleArtistsSection = () => setIsArtistsExpanded(!isArtistsExpanded);
  const toggleGroupsSection = () => setIsGroupsExpanded(!isGroupsExpanded);

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

  const renderArtists = useMemo(() => {
    if (artistsLoading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (artistsError) {
      return <div className={styles.error}>{artistsError.message}</div>;
    }
    return artists.map(artist => (
      <Card
        key={`artist-${artist.id}`}
        type="artist"
        title={artist.name}
        imageUrl={normalizeImageUrl(artist?.image?.formattedImageURL)}
        href={`/spotify/artist/${artist.id}`}
        onPlay={() => handleArtistClick(artist.id)}
      />
    ));
  }, [artists, artistsLoading, artistsError, t, handleArtistClick]);

  const renderGroups = useMemo(() => {
    if (groupsLoading) {
      return <div className={styles.loading}>{t('common.loading')}</div>;
    }
    if (groupsError) {
      return <div className={styles.error}>{groupsError.message}</div>;
    }
    return groups.map(group => (
      <Card
        key={`group-${group.id}`}
        type="group"
        title={group.name}
        imageUrl={normalizeImageUrl(group?.image?.formattedImageURL)}
        href={`/spotify/group/${group.id}`}
        onPlay={() => handleGroupClick(group.id)}
      />
    ));
  }, [groups, groupsLoading, groupsError, t, handleGroupClick]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <section className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={toggleArtistsSection}
            role="button"
            tabIndex={0}
          >
            <h2 className={styles.sectionTitle}>{t('artist.all')}</h2>
            <Image
              src={`/assets/icons/chevron${theme === 'dark' ? '-white' : ''}.svg`}
              alt={isArtistsExpanded ? 'Collapse' : 'Expand'}
              width={24}
              height={24}
              className={`${styles.chevron} ${isArtistsExpanded ? styles.expanded : ''}`}
            />
          </div>
          {isArtistsExpanded && (
            <div className={styles.grid}>{renderArtists}</div>
          )}
        </section>

        <section className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={toggleGroupsSection}
            role="button"
            tabIndex={0}
          >
            <h2 className={styles.sectionTitle}>{t('group.all')}</h2>
            <Image
              src={`/assets/icons/chevron${theme === 'dark' ? '-white' : ''}.svg`}
              alt={isGroupsExpanded ? 'Collapse' : 'Expand'}
              width={24}
              height={24}
              className={`${styles.chevron} ${isGroupsExpanded ? styles.expanded : ''}`}
            />
          </div>
          {isGroupsExpanded && (
            <div className={styles.grid}>{renderGroups}</div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}

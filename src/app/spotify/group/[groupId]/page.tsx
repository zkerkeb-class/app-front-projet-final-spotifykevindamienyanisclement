'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslationContext } from '@/providers/TranslationProvider';
import MainLayout from '@/components/Layout/MainLayout';
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll';
import styles from './page.module.scss';

// Données mockées (à remplacer par des appels API)
const groupData = {
  id: 1,
  name: 'Rock Classics',
  description: 'Les plus grands classiques du rock de tous les temps',
  memberCount: 1500,
  imageUrl: '/groups/rock-classics.jpg',
  createdAt: '2024-01-01',
  owner: {
    name: 'John Doe',
    imageUrl: '/users/john-doe.jpg',
  },
  playlists: [
    {
      id: 1,
      name: 'Rock 70s',
      imageUrl: '/playlists/rock-70s.jpg',
      trackCount: 50,
    },
    {
      id: 2,
      name: 'Rock 80s',
      imageUrl: '/playlists/rock-80s.jpg',
      trackCount: 45,
    },
  ],
  members: [
    {
      id: 1,
      name: 'Alice Smith',
      imageUrl: '/users/alice-smith.jpg',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      imageUrl: '/users/bob-johnson.jpg',
      role: 'member',
    },
  ],
  discussions: [
    {
      id: 1,
      title: 'Meilleurs albums de 2023',
      author: 'Alice Smith',
      replies: 25,
      lastActivity: '2024-03-10T10:00:00Z',
    },
    {
      id: 2,
      title: 'Concert à venir',
      author: 'Bob Johnson',
      replies: 15,
      lastActivity: '2024-03-09T15:30:00Z',
    },
  ],
};

export default function GroupDetailPage() {
  const { groupId } = useParams();
  const { t } = useTranslationContext();

  const memberCountText = (count: number) =>
    t('group.memberCount').replace('{{count}}', count.toString());
  const trackCountText = (count: number) =>
    t('playlist.trackCount').replace('{{count}}', count.toString());
  const replyCountText = (count: number) =>
    t('group.replyCount').replace('{{count}}', count.toString());

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.coverImage}>
            <Image
              src={groupData.imageUrl}
              alt={groupData.name}
              fill
              className={styles.image}
              priority
            />
          </div>
          <div className={styles.groupInfo}>
            <span className={styles.type}>{t('group.type')}</span>
            <h1 className={styles.title}>{groupData.name}</h1>
            <p className={styles.description}>{groupData.description}</p>
            <div className={styles.meta}>
              <Image
                src={groupData.owner.imageUrl}
                alt={groupData.owner.name}
                width={28}
                height={28}
                className={styles.ownerImage}
              />
              <span className={styles.owner}>{groupData.owner.name}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.memberCount}>
                {memberCountText(groupData.memberCount)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.actions}>
            <button type="button" className={styles.joinButton}>
              {t('group.join')}
            </button>
            <button type="button" className={styles.shareButton}>
              {t('common.share')}
            </button>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('group.playlists')}</h2>
            <HorizontalScroll>
              {groupData.playlists.map(playlist => (
                <div key={playlist.id} className={styles.playlistCard}>
                  <Image
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    width={160}
                    height={160}
                    className={styles.playlistImage}
                  />
                  <h3 className={styles.playlistName}>{playlist.name}</h3>
                  <p className={styles.trackCount}>
                    {trackCountText(playlist.trackCount)}
                  </p>
                </div>
              ))}
            </HorizontalScroll>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('group.discussions')}</h2>
            <div className={styles.discussionList}>
              {groupData.discussions.map(discussion => (
                <div key={discussion.id} className={styles.discussionCard}>
                  <h3 className={styles.discussionTitle}>{discussion.title}</h3>
                  <div className={styles.discussionMeta}>
                    <span className={styles.author}>{discussion.author}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.replies}>
                      {replyCountText(discussion.replies)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('group.members')}</h2>
            <div className={styles.memberList}>
              {groupData.members.map(member => (
                <div key={member.id} className={styles.memberCard}>
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={48}
                    height={48}
                    className={styles.memberImage}
                  />
                  <div className={styles.memberInfo}>
                    <span className={styles.memberName}>{member.name}</span>
                    <span className={styles.memberRole}>
                      {t(`group.role.${member.role}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

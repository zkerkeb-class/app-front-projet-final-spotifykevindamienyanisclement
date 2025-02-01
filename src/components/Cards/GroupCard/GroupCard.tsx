'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './GroupCard.module.scss';

interface GroupCardProps {
  id: number;
  name: string;
  memberCount: number;
  imageUrl: string;
  description: string;
}

export default function GroupCard({
  id,
  name,
  memberCount,
  imageUrl,
  description,
}: GroupCardProps) {
  const router = useRouter();
  const { t } = useTranslationContext();

  const memberCountText = (count: number) =>
    t('group.members').replace('{{count}}', count.toString());

  const handleClick = () => {
    router.push(`/spotify/group/${id}`);
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${name}, ${memberCountText(memberCount)}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={name}
          width={160}
          height={160}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.memberCount}>{memberCountText(memberCount)}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

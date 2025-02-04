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
  onClick: () => void;
}

export default function GroupCard({
  id,
  name,
  memberCount,
  imageUrl,
  onClick,
}: GroupCardProps) {
  const router = useRouter();
  const { t } = useTranslationContext();

  const memberCountText = (count: number) =>
    t('group.members').replace('{{count}}', count.toString());

  return (
    <div
      className={styles.card}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${name}, ${memberCountText(memberCount)}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={
            imageUrl
              ? `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`
              : '/assets/images/default-artist.jpg'
          }
          alt={name}
          width={160}
          height={160}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.memberCount}>{memberCountText(memberCount)}</p>
      </div>
    </div>
  );
}

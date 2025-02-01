import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import classNames from 'classnames';
import styles from './Card.module.scss';

interface CardProps {
  type: 'album' | 'track' | 'artist';
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  duration?: string;
  onPlay?: () => void;
}

export default function Card({
  type,
  title,
  description,
  imageUrl,
  href,
  duration,
  onPlay,
}: CardProps) {
  const { t } = useTranslationContext();

  return (
    <Link
      href={href}
      className={classNames(styles.card, {
        [styles.track]: type === 'track',
        [styles.artist]: type === 'artist',
      })}
    >
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl || '/images/default-album.jpg'}
          alt={title}
          width={100}
          height={100}
          className={styles.image}
        />
        <button
          className={styles.playButton}
          type="button"
          onClick={e => {
            e.preventDefault();
            onPlay?.();
          }}
          aria-label={t('player.play')}
        >
          <Icon icon="mdi:play" />
        </button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {type === 'track' && duration && (
        <span className={styles.duration}>{duration}</span>
      )}
    </Link>
  );
}

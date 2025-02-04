import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useAuth } from '@/context/userContext';
import AuthModal from '@/components/Modal/AuthModal/AuthModal';
import { usePlayer } from '@/context/playerContext';
import { TrackFull } from '@/types/api/track';
import styles from './Card.module.scss';

interface CardProps {
  type: 'album' | 'track' | 'artist' | 'group';
  title: string;
  description?: string;
  imageUrl?: string;
  href: string;
  duration?: string;
  onPlay?: () => void;
  track?: TrackFull;
}

export default function Card({
  type,
  title,
  description,
  imageUrl,
  href,
  duration,
  onPlay,
  track,
}: CardProps) {
  const { t } = useTranslationContext();
  const { isAuthenticated } = useAuth();
  const { loadTrackFull } = usePlayer();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handlePlay = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isAuthenticated) {
        if (track) {
          loadTrackFull(track);
        }
        onPlay?.();
      } else {
        setShowAuthModal(true);
      }
    },
    [isAuthenticated, onPlay, track, loadTrackFull]
  );

  return (
    <>
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
            onClick={e => handlePlay(e)}
            aria-label={t('player.play')}
          >
            <Image
              src="/assets/icons/play.svg"
              alt="Play"
              width={24}
              height={24}
            />
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
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

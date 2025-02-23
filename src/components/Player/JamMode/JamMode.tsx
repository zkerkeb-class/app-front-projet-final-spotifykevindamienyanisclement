import { useCallback, useState } from 'react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useJamSession } from '@/hooks/api/useJamSession';
import Image from 'next/image';
import { useTheme } from '@/hooks/settings/useTheme';
import styles from './JamMode.module.scss';

export default function JamMode() {
  const { t } = useTranslationContext();
  const { theme } = useTheme();
  const [showShareModal, setShowShareModal] = useState(false);
  const { session, createSession, joinSession, leaveSession } = useJamSession();

  const handleCreateSession = useCallback(async () => {
    const sessionId = await createSession();
    if (sessionId) {
      joinSession(sessionId);
      setShowShareModal(true);
    }
  }, [createSession, joinSession]);

  if (!session) {
    return (
      <button
        type="button"
        className={styles.jamButton}
        onClick={handleCreateSession}
        aria-label={t('player.startJamSession')}
      >
        <Image
          src={`/assets/icons/jam${theme === 'dark' ? '-white' : ''}.svg`}
          alt={t('player.startJamSession')}
          width={24}
          height={24}
        />
      </button>
    );
  }

  return (
    <div className={styles.jamMode}>
      <div className={styles.participants}>
        {session.participants.map(participant => (
          <div key={participant.id} className={styles.participant}>
            {participant.username}
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.shareButton}
        onClick={() => setShowShareModal(true)}
      >
        {t('player.share')}
      </button>
      <button
        type="button"
        className={styles.leaveButton}
        onClick={leaveSession}
      >
        {t('player.leaveSession')}
      </button>

      {showShareModal && (
        <div className={styles.shareModal}>
          <h3>{t('player.shareSession')}</h3>
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/jam/${session.id}`}
          />
          <button type="button" onClick={() => setShowShareModal(false)}>
            {t('common.close')}
          </button>
        </div>
      )}
    </div>
  );
}

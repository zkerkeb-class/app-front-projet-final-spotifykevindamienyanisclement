'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useAccessibility } from '@/hooks/settings/useAccessibility';
import { useAnnouncer } from '@/hooks/ui/useAnnouncer';
import FocusTrap from '@/components/FocusTrap/FocusTrap';
import styles from './AuthModal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { voiceMessages } = useAccessibility();
  const { announce } = useAnnouncer();
  const { t } = useTranslationContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const modalElement = document.getElementById('auth-modal');
      modalElement?.focus();
      if (voiceMessages) {
        announce(t('auth.modal.title'));
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, voiceMessages, t, announce]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        if (voiceMessages) {
          announce(t('common.modal.close'));
        }
      }
    },
    [onClose, voiceMessages, t, announce]
  );

  const handleSignup = useCallback(() => {
    router.push('/spotify/auth/register');
    onClose();
    if (voiceMessages) {
      announce(t('auth.signupSuccess'));
    }
  }, [router, onClose, voiceMessages, t, announce]);

  const handleLogin = useCallback(() => {
    router.push('/spotify/auth/login');
    onClose();
    if (voiceMessages) {
      announce(t('auth.loginRedirect'));
    }
  }, [router, onClose, voiceMessages, t, announce]);

  if (!isOpen) return null;

  return (
    <FocusTrap>
      <div
        className={styles.overlay}
        role="presentation"
        onClick={onClose}
        onKeyDown={handleKeyDown}
      >
        <div
          id="auth-modal"
          className={styles.modal}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          tabIndex={-1}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={t('common.modal.close')}
          >
            X
          </button>
          <div className={styles.content}>
            <br />
            <h2 id="modal-title" className={styles.title}>
              {t('auth.modal.title')}
            </h2>
            <p id="modal-description" className={styles.description}>
              {t('auth.modal.description')}
            </p>
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.signupButton}
                onClick={handleSignup}
                aria-describedby="modal-description"
              >
                {t('auth.signup')}
              </button>
              <button
                type="button"
                className={styles.loginButton}
                onClick={handleLogin}
                aria-describedby="modal-description"
              >
                {t('auth.login')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

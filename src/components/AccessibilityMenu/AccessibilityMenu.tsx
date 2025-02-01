'use client';

import { useState, useEffect } from 'react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useAccessibility } from '@/hooks/settings/useAccessibility';
import { useAnnouncer } from '@/hooks/ui/useAnnouncer';
import styles from './AccessibilityMenu.module.scss';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslationContext();
  const { announce } = useAnnouncer();
  const {
    highContrast,
    screenReader,
    keyboardNavigation,
    voiceMessages,
    toggleHighContrast,
    toggleScreenReader,
    toggleKeyboardNavigation,
    toggleVoiceMessages,
  } = useAccessibility();

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-high-contrast',
      highContrast.toString()
    );
    document.documentElement.setAttribute(
      'data-screen-reader',
      screenReader.toString()
    );
    document.documentElement.setAttribute(
      'data-keyboard-nav',
      keyboardNavigation.toString()
    );
  }, [highContrast, screenReader, keyboardNavigation]);

  const handleToggle = (
    toggle: () => void,
    feature: string,
    enabled: boolean
  ) => {
    toggle();
    announce(
      `${feature} ${enabled ? t('accessibility.enabled') : t('accessibility.disabled')}`
    );
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.accessibilityButton}
        aria-expanded={isOpen}
        aria-label={t('accessibility.settings')}
      >
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M10 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4M5.472 4.15a1.76 1.76 0 0 0-2.317.88c-.4.882-.008 1.917.877 2.31l2.671 1.19A.5.5 0 0 1 7 8.987v1.865a.5.5 0 0 1-.036.187l-1.84 4.555a1.75 1.75 0 0 0 3.244 1.311l1.398-3.459a.25.25 0 0 1 .463 0l1.398 3.459a1.75 1.75 0 0 0 3.245-1.311l-1.836-4.544a.5.5 0 0 1-.036-.187V8.987a.5.5 0 0 1 .297-.457l2.671-1.19a1.74 1.74 0 0 0 .877-2.31a1.76 1.76 0 0 0-2.317-.88l-1.276.569a1.04 1.04 0 0 0-.52.524a3 3 0 0 1-5.463 0a1.04 1.04 0 0 0-.52-.524z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={styles.menu}
          role="menu"
          aria-label={t('accessibility.menu')}
        >
          <button
            type="button"
            onClick={() =>
              handleToggle(
                toggleHighContrast,
                t('accessibility.highContrast'),
                !highContrast
              )
            }
            className={`${styles.menuItem} ${highContrast ? styles.active : ''}`}
            role="menuitem"
          >
            <span>{t('accessibility.highContrast')}</span>
            <span className={styles.status}>
              {highContrast
                ? t('accessibility.enabled')
                : t('accessibility.disabled')}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleToggle(
                toggleScreenReader,
                t('accessibility.screenReader'),
                !screenReader
              )
            }
            className={`${styles.menuItem} ${screenReader ? styles.active : ''}`}
            role="menuitem"
          >
            <span>{t('accessibility.screenReader')}</span>
            <span className={styles.status}>
              {screenReader
                ? t('accessibility.enabled')
                : t('accessibility.disabled')}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleToggle(
                toggleKeyboardNavigation,
                t('accessibility.keyboardNav'),
                !keyboardNavigation
              )
            }
            className={`${styles.menuItem} ${
              keyboardNavigation ? styles.active : ''
            }`}
            role="menuitem"
          >
            <span>{t('accessibility.keyboardNav')}</span>
            <span className={styles.status}>
              {keyboardNavigation
                ? t('accessibility.enabled')
                : t('accessibility.disabled')}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleToggle(
                toggleVoiceMessages,
                t('accessibility.voiceMessages'),
                !voiceMessages
              )
            }
            className={`${styles.menuItem} ${voiceMessages ? styles.active : ''}`}
            role="menuitem"
          >
            <span>{t('accessibility.voiceMessages')}</span>
            <span className={styles.status}>
              {voiceMessages
                ? t('accessibility.enabled')
                : t('accessibility.disabled')}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

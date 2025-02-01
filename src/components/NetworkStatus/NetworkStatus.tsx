'use client';

import { useEffect, useState, useCallback } from 'react';
import { useNetworkStatus } from '@/hooks/settings/useNetworkStatus';
import { useTranslationContext } from '@/providers/TranslationProvider';
import styles from './NetworkStatus.module.scss';

export default function NetworkStatus() {
  const { t } = useTranslationContext();
  const [mounted, setMounted] = useState(false);
  const { isOnline, hasUpdate, isPendingSync, pendingActions, setOnline } =
    useNetworkStatus();

  const checkConnection = useCallback(async () => {
    try {
      const response = await fetch('/api/ping', {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOnline(data.online);
    } catch (error) {
      setOnline(false);
    }
  }, [setOnline]);

  useEffect(() => {
    const handleOnline = () => {
      setMounted(true);
      checkConnection();
    };
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Vérification initiale
    handleOnline();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnection, setOnline]);

  if (!mounted) return null;

  if (isOnline && !isPendingSync && !hasUpdate && pendingActions === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {!isOnline && (
        <div className={styles.offline}>
          <span>{t('network.offline')}</span>
        </div>
      )}
      {isPendingSync && (
        <div className={styles.syncing}>
          <span>{t('network.syncing')}</span>
        </div>
      )}
      {pendingActions > 0 && (
        <div className={styles.pending}>
          <span>{t(`network.pendingActions_${pendingActions}`)}</span>
        </div>
      )}
      {hasUpdate && (
        <button
          type="button"
          className={styles.update}
          onClick={() => window.location.reload()}
        >
          {t('network.update')}
        </button>
      )}
    </div>
  );
}

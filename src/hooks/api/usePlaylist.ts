import { useState, useEffect } from 'react';
import { ListenedTrack, LastListenedTrack } from '@/types/api/playlist';
import logger from '@/utils/logger';

export async function getLastListenedPlaylist() {
  try {
    const response = await fetch('/api/playlist?type=last-listened');
    const data = await response.json();
    return data as LastListenedTrack[];
  } catch (err) {
    logger.error('Error fetching last listened playlist:', err);
    return [];
  }
}

export async function getMostListenedPlaylist() {
  try {
    const response = await fetch('/api/playlist?type=most-listened');
    const data = await response.json();
    return data as ListenedTrack[];
  } catch (err) {
    logger.error('Error fetching most listened playlist:', err);
    return [];
  }
}

export function useLastListenedPlaylist() {
  const [playlist, setPlaylist] = useState<LastListenedTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLastListenedPlaylist = async () => {
      try {
        const data = await getLastListenedPlaylist();
        setPlaylist(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastListenedPlaylist();
  }, []);

  return { playlist, loading, error };
}

export function useMostListenedPlaylist() {
  const [playlist, setPlaylist] = useState<ListenedTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMostListenedPlaylist = async () => {
      try {
        const data = await getMostListenedPlaylist();
        setPlaylist(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostListenedPlaylist();
  }, []);

  return { playlist, loading, error };
}

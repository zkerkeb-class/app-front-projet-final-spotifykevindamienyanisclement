import { useState, useEffect } from 'react';
import type { Track, TrackFull } from '@/types/api/track';

export function useTracks(limit: number = 10) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`/api/track?limit=${limit}`);
        const data = await response.json();

        const sortedTracks = [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        setTracks(sortedTracks.slice(0, limit));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [limit]);

  return { tracks, loading, error };
}

export function useTrackById(id: number) {
  const [track, setTrack] = useState<TrackFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbumById = async () => {
      try {
        const response = await fetch(`/api/track?id=${id}`);
        const data = await response.json();
        setTrack(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumById();
  }, [id]);

  return { track, loading, error };
}

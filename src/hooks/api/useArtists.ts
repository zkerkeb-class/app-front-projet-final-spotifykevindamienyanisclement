import { useState, useEffect } from 'react';
import type { Artist, ArtistFull } from '@/types/api/artist';

export function useArtists(limit: number = 50) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`/api/artist?limit=${limit}`);
        const data = await response.json();

        const sortedArtists = [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        setArtists(sortedArtists.slice(0, limit));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [limit]);

  return { artists, loading, error };
}

export function useArtistById(id: number) {
  const [artist, setArtist] = useState<ArtistFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbumById = async () => {
      try {
        const response = await fetch(`/api/artist?id=${id}`);
        const data = await response.json();
        setArtist(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumById();
  }, [id]);

  return { artist, loading, error };
}

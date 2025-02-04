import { useState, useEffect } from 'react';
import type { Album, AlbumFull } from '@/types/api/album';

export function useAlbums(limit: number = 50) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`/api/album?limit=${limit}`);
        const data = await response.json();

        const sortedAlbums = [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        setAlbums(sortedAlbums.slice(0, limit));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [limit]);

  return { albums, loading, error };
}

export function useAlbumById(id: number) {
  const [album, setAlbum] = useState<AlbumFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbumById = async () => {
      try {
        const response = await fetch(`/api/album?id=${id}`);
        const data = await response.json();
        setAlbum(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumById();
  }, [id]);

  return { album, loading, error };
}

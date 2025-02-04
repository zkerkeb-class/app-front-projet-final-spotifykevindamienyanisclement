import { useState, useEffect } from 'react';
import type { Group, GroupFull } from '@/types/api/group';

export function useGroups(limit: number = 50) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`/api/group?limit=${limit}`);
        const data = await response.json();

        const sortedGroups = [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        setGroups(sortedGroups.slice(0, limit));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [limit]);

  return { groups, loading, error };
}

export function useGroupById(id: number) {
  const [group, setGroup] = useState<GroupFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlbumById = async () => {
      try {
        const response = await fetch(`/api/group?id=${id}`);
        const data = await response.json();
        setGroup(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumById();
  }, [id]);

  return { group, loading, error };
}

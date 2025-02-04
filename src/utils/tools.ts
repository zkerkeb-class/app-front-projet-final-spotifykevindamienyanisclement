import logger from './logger';

export const convertDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const convertVolume = (volume: number) => {
  return volume * 100;
};

export const convertProgress = (currentTime: number, duration: number) => {
  return (currentTime / duration) * 100;
};

export const normalizeImageUrl = (url: string | undefined | null): string => {
  if (!url) return '/assets/images/default-album.jpg';

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.startsWith('uploads/')) {
    return `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  }

  if (url.startsWith('assets/images/')) {
    return `/${url}`;
  }

  return url;
};

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      logger.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error(`Error writing ${key} to localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.error(`Error removing ${key} from localStorage:`, error);
    }
  },
};

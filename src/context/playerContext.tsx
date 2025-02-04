'use client';

import { TrackFull, Track } from '@/types/api/track';
import { Artist } from '@/types/api/artist';
import { Album } from '@/types/api/album';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import logger from '@/utils/logger';
import { storage } from '@/utils/tools';

interface PlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  currentTrackFull: TrackFull | null;
  setCurrentTrackFull: (trackFull: TrackFull | null) => void;
  currentArtist: Artist | null;
  setCurrentArtist: (artist: Artist | null) => void;
  currentAlbum: Album | null;
  setCurrentAlbum: (album: Album | null) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  toggleMute: () => void;
  loadTrackFull: (trackFull: TrackFull) => Promise<void>;
  loadArtist: (artist: Artist) => Promise<void>;
  loadAlbum: (album: Album) => Promise<void>;
  handleTimeUpdate: () => void;
  handleVolumeChange: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  playlist: TrackFull[];
  currentTrackIndex: number;
  setPlaylist: (playlist: TrackFull[]) => void;
  loadPlaylist: (tracks: TrackFull[], startIndex?: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PLAYLIST: 'player_playlist',
  CURRENT_INDEX: 'player_current_index',
} as const;

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackFull, setCurrentTrackFull] = useState<TrackFull | null>(
    null
  );
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [playlist, setPlaylist] = useState<TrackFull[]>(() => {
    return storage.get<TrackFull[]>(STORAGE_KEYS.PLAYLIST, []);
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => {
    return storage.get<number>(STORAGE_KEYS.CURRENT_INDEX, -1);
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initializeAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.crossOrigin = 'anonymous';
    }
  }, [volume, isMuted]);

  const play = useCallback(async () => {
    try {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          logger.info('Audio playing successfully');
        }
      }
    } catch (error) {
      logger.error('Play failed:', error);
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  }, []);

  const loadArtist = useCallback(async (artist: Artist): Promise<void> => {
    try {
      setCurrentArtist(artist);
    } catch (error) {
      logger.error('Error in loadArtist:', error);
    }
  }, []);

  const loadAlbum = useCallback(async (album: Album): Promise<void> => {
    try {
      setCurrentAlbum(album);
    } catch (error) {
      logger.error('Error in loadAlbum:', error);
    }
  }, []);

  const loadTrackFull = useCallback(
    async (trackFull: TrackFull): Promise<void> => {
      try {
        if (!trackFull.sound) {
          throw new Error('No sound data available');
        }

        const soundUrl =
          trackFull.sound.m4aSoundURL || trackFull.sound.originalSoundURL;

        if (!soundUrl) {
          throw new Error('No valid sound URL');
        }

        // Pause current track if playing
        if (audioRef.current && isPlaying) {
          pause();
        }

        setCurrentTrackFull(trackFull);

        if (playlist.length === 0) {
          const newPlaylist = [trackFull];
          setPlaylist(newPlaylist);
          setCurrentTrackIndex(0);
          localStorage.setItem(
            STORAGE_KEYS.PLAYLIST,
            JSON.stringify(newPlaylist)
          );
          localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, '0');
        } else {
          const trackIndex = playlist.findIndex(
            track => track.id === trackFull.id
          );
          if (trackIndex !== -1) {
            setCurrentTrackIndex(trackIndex);
            localStorage.setItem(
              STORAGE_KEYS.CURRENT_INDEX,
              trackIndex.toString()
            );
          } else {
            const newPlaylist = [...playlist, trackFull];
            setPlaylist(newPlaylist);
            setCurrentTrackIndex(playlist.length);
            localStorage.setItem(
              STORAGE_KEYS.PLAYLIST,
              JSON.stringify(newPlaylist)
            );
            localStorage.setItem(
              STORAGE_KEYS.CURRENT_INDEX,
              playlist.length.toString()
            );
          }
        }

        if (audioRef.current) {
          audioRef.current.src = soundUrl;
          initializeAudio();
          await play();
        }
      } catch (error) {
        logger.error('Error loading track:', error);
        setIsPlaying(false);
      }
    },
    [isPlaying, pause, play, initializeAudio, playlist]
  );

  const nextTrack = useCallback(() => {
    if (playlist.length === 0 || currentTrackIndex === -1) {
      logger.warn('No playlist available or no current track');
      return;
    }

    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    const trackToPlay = playlist[nextIndex];

    if (trackToPlay) {
      loadTrackFull(trackToPlay).catch(error => {
        logger.error('Error loading next track:', error);
      });
    }
  }, [currentTrackIndex, playlist, loadTrackFull]);

  const previousTrack = useCallback(() => {
    if (playlist.length === 0 || currentTrackIndex === -1) {
      logger.warn('No playlist available or no current track');
      return;
    }

    const previousIndex =
      currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    const trackToPlay = playlist[previousIndex];

    if (trackToPlay) {
      loadTrackFull(trackToPlay).catch(error => {
        logger.error('Error loading previous track:', error);
      });
    }
  }, [currentTrackIndex, playlist, loadTrackFull]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const currentTimeValue = audioRef.current.currentTime;
      const durationValue = audioRef.current.duration;
      setCurrentTime(currentTimeValue);
      setProgress((currentTimeValue / durationValue) * 100);
    }
  }, []);

  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
        return newVolume;
      }
      return volume;
    },
    [volume]
  );

  const loadPlaylist = useCallback(
    (tracks: TrackFull[], startIndex: number = 0) => {
      if (tracks.length === 0) {
        logger.warn('Attempting to load empty playlist');
        return;
      }

      setPlaylist(tracks);
      setCurrentTrackIndex(startIndex);

      try {
        localStorage.setItem(STORAGE_KEYS.PLAYLIST, JSON.stringify(tracks));
        localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, startIndex.toString());
      } catch (error) {
        logger.error('Error saving playlist to localStorage:', error);
      }

      const trackToPlay = tracks[startIndex];
      if (trackToPlay) {
        loadTrackFull(trackToPlay).catch(error => {
          logger.error('Error loading track from playlist:', error);
        });
      }
    },
    [loadTrackFull]
  );

  // Gestionnaire d'événements audio
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
        nextTrack();
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleError = (e: ErrorEvent) => {
        logger.error('Audio error:', e);
        setIsPlaying(false);
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('error', handleError);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
    return undefined;
  }, [handleTimeUpdate, nextTrack]);

  useEffect(() => {
    const savedPlaylist = storage.get<TrackFull[]>(STORAGE_KEYS.PLAYLIST, []);
    const savedIndex = storage.get<number>(STORAGE_KEYS.CURRENT_INDEX, -1);

    setPlaylist(savedPlaylist);
    setCurrentTrackIndex(savedIndex);

    const trackToPlay = savedPlaylist[savedIndex];
    if (trackToPlay) {
      setCurrentTrackFull(trackToPlay);
    }
  }, []);

  useEffect(() => {
    storage.set(STORAGE_KEYS.PLAYLIST, playlist);
    storage.set(STORAGE_KEYS.CURRENT_INDEX, currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  const contextValue = useMemo(
    () => ({
      isPlaying,
      setIsPlaying,
      isMuted,
      setIsMuted,
      volume,
      setVolume,
      progress,
      setProgress,
      duration,
      setDuration,
      currentTime,
      setCurrentTime,
      currentTrack,
      setCurrentTrack,
      currentTrackFull,
      setCurrentTrackFull,
      currentArtist,
      setCurrentArtist,
      currentAlbum,
      setCurrentAlbum,
      play,
      pause,
      stop,
      toggleMute,
      loadTrackFull,
      loadArtist,
      loadAlbum,
      handleTimeUpdate,
      handleVolumeChange,
      nextTrack,
      previousTrack,
      playlist,
      currentTrackIndex,
      setPlaylist,
      loadPlaylist,
    }),
    [
      isPlaying,
      isMuted,
      volume,
      progress,
      duration,
      currentTime,
      currentTrackFull,
      currentTrack,
      currentArtist,
      currentAlbum,
      play,
      pause,
      stop,
      toggleMute,
      loadTrackFull,
      loadArtist,
      loadAlbum,
      handleTimeUpdate,
      handleVolumeChange,
      nextTrack,
      previousTrack,
      loadPlaylist,
    ]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <track kind="captions" srcLang="fr" label="Français" />
      </audio>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

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
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

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
    [isPlaying, pause, play, initializeAudio]
  );

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

  // Gestionnaire d'événements audio
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
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
  }, [handleTimeUpdate]);

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

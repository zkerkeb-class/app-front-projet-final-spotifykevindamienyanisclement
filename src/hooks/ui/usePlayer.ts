import { useCallback } from 'react';
import { usePlayer } from '@/context/playerContext';
import { TrackFull } from '@/types/api/track';
import logger from '@/utils/logger';

export const usePlayerControls = () => {
  const context = usePlayer();

  if (!context) {
    throw new Error('usePlayerControls must be used within PlayerProvider');
  }

  const {
    isPlaying,
    isMuted,
    volume,
    progress,
    duration,
    currentTime,
    currentTrackFull,
    play,
    pause,
    stop,
    toggleMute,
    handleVolumeChange,
    nextTrack,
    previousTrack,
    playlist,
    currentTrackIndex,
    setPlaylist,
    loadPlaylist,
  } = context;

  const loadTrackFull = useCallback(
    async (track: TrackFull) => {
      try {
        await context.loadTrackFull(track);
        await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trackId: track.id }),
        });
      } catch (error) {
        logger.error('Error loading track:', error);
      }
    },
    [context]
  );

  return {
    isPlaying,
    isMuted,
    volume,
    progress,
    duration,
    currentTime,
    currentTrackFull,
    play,
    pause,
    stop,
    toggleMute,
    handleVolumeChange,
    nextTrack,
    previousTrack,
    playlist,
    currentTrackIndex,
    setPlaylist,
    loadPlaylist,
    loadTrackFull,
  };
};

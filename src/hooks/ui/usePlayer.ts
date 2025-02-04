import { usePlayer } from '@/context/playerContext';

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
    loadTrackFull,
    handleVolumeChange,
    nextTrack,
    previousTrack,
    playlist,
    currentTrackIndex,
    setPlaylist,
    loadPlaylist,
  } = context;

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
    loadTrackFull,
    handleVolumeChange,
    nextTrack,
    previousTrack,
    playlist,
    currentTrackIndex,
    setPlaylist,
    loadPlaylist,
  };
};

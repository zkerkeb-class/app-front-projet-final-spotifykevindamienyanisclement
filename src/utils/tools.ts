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

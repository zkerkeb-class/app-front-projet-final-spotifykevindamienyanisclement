export declare interface TrackFull {
  id: number;
  title: string;

  sound: Sound;
  soundId: number;

  album: Album;
  albumId: number;

  playlist: Playlist;
  playlistId: number;

  artist: Artist;
  artistId: number;

  createdAt: Date;
  updatedAt: Date;
}

export declare interface Track {
  id: number;
  title: string;

  album: Album;
  albumId: number;

  soundId: number | null;
  sound: Sound | null;

  playlistId: number | null;
  playlist: Playlist | null;

  artistId: number | null;
  artist: Artist | null;

  createdAt: Date;
  updatedAt: Date;
}

export declare interface TrackResponse {
  track: Track;
}

export declare interface TrackFullResponse {
  track: TrackFull;
}

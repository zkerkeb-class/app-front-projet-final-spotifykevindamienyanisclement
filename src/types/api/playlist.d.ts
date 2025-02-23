import { Track } from './track';
import { Album } from './album';
import { Artist } from './artist';

export declare interface PlaylistFull {
  id: number;
  title: string;

  image: Image | null;
  imageId: number | null;
  user: User;
  userId: number;
  tracks: Track[];

  createdAt: Date;
  updatedAt: Date;
}

export declare interface Playlist {
  id: number;
  title: string;

  imageId: number | null;
  image: Image | null;

  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export declare interface PlaylistResponse {
  playlist: Playlist;
}

export declare interface PlaylistFullResponse {
  playlist: PlaylistFull;
}

export interface LastListenedTrack {
  id: number;
  userId: number;
  trackId: number;
  createdAt: string;
  track: {
    id: number;
    title: string;
    soundId: number;
    albumId: number;
    playlistId: number | null;
    artistId: number;
    groupId: number;
    createdAt: string;
    updatedAt: string;
    album: Album;
    artist: Artist;
  };
}

export interface ListenedTrack extends Track {
  id: number;
  title: string;
  soundId: number;
  albumId: number;
  playlistId: number | null;
  artistId: number;
  groupId: number;
  album?: Album;
  artist: Artist;
}

export interface ListenedTracksResponse {
  tracks: ListenedTrack[];
}

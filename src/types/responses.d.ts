import type {
  Album,
  Artist,
  Track,
  Playlist,
  User,
  Group,
  Image,
  Sound,
} from './models';

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
  status: number;
}

export type AlbumResponse = ApiResponse<Album>;
export type ArtistResponse = ApiResponse<Artist>;
export type TrackResponse = ApiResponse<Track>;
export type PlaylistResponse = ApiResponse<Playlist>;
export type UserResponse = ApiResponse<User>;
export type GroupResponse = ApiResponse<Group>;
export type ImageResponse = ApiResponse<Image>;
export type SoundResponse = ApiResponse<Sound>;

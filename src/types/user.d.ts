import { Playlist } from '@/types/api/playlist';

declare interface UserFull {
  id: number;
  name: string | null;
  email: string;

  playlists: Playlist[];

  createdAt: Date;
  updatedAt: Date;
}

declare interface User {
  id: number;
  name: string | null;
  email: string;

  createdAt: Date;
  updatedAt: Date;
}

declare interface UserResponse {
  user: User;
}

declare interface UserFullResponse {
  user: UserFull;
}

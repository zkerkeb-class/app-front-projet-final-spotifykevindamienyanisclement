export interface Album extends BaseEntity {
  title: string;
  imageId: number | null;
  image?: Image | null;
  artistId: number | null;
  artist?: Artist | null;
  groupId: number | null;
  group?: Group | null;
  tracks?: Track[];
}

export interface Artist extends BaseEntity {
  name: string;
  imageId: number | null;
  image?: Image | null;
  groupId: number | null;
  group?: Group | null;
  albums?: Album[];
  tracks?: Track[];
}

export interface Track extends BaseEntity {
  title: string;
  soundId: number | null;
  sound?: Sound | null;
  albumId: number;
  album?: Album | null;
  playlistId: number | null;
  playlist?: Playlist | null;
  artistId: number | null;
  artist?: Artist | null;
}

export interface Playlist extends BaseEntity {
  title: string;
  imageId: number | null;
  image?: Image | null;
  userId: number;
  user?: User | null;
  tracks?: Track[];
}

export interface User extends BaseEntity {
  name: string | null;
  email: string;
  playlists?: Playlist[];
}

export interface Group extends BaseEntity {
  name: string;
  imageId: number | null;
  image?: Image | null;
  albums?: Album[];
  artists?: Artist[];
}

export interface Image extends BaseEntity {
  url: string;
}

export interface Sound extends BaseEntity {
  url: string;
}

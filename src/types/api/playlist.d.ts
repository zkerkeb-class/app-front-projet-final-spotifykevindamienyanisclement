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

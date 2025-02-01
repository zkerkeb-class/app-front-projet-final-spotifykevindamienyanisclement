export declare interface AlbumFull {
  id: number;
  title: string;

  image: Image | null;
  imageId: number | null;

  artist: Artist | null;
  artistId: number | null;

  group: Group | null;
  groupId: number | null;

  tracks: Track[];

  createdAt: Date;
  updatedAt: Date;
}

export declare interface Album {
  id: number;
  title: string;

  imageId: number | null;
  image: Image | null;

  artistId: number | null;
  groupId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export declare interface AlbumResponse {
  album: Album;
}

export declare interface AlbumFullResponse {
  album: AlbumFull;
}

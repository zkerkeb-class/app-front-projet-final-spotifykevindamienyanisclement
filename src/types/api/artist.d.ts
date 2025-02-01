export declare interface ArtistFull {
  id: number;
  name: string;

  image: Image | null;
  imageId: number | null;

  groupId: number | null;
  group: Group | null;

  albums: Album[];
  tracks: Track[];

  createdAt: Date;
  updatedAt: Date;
}

export declare interface Artist {
  id: number;
  name: string;

  imageId: number | null;
  image: Image | null;

  groupId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export declare interface ArtistResponse {
  artist: Artist;
}

export declare interface ArtistFullResponse {
  artist: ArtistFull;
}

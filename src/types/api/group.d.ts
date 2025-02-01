export declare interface GroupFull {
  id: number;
  name: string;

  image: Image | null;
  imageId: number | null;

  albums: Album[];
  artists: Artist[];

  createdAt: Date;
  updatedAt: Date;
}

export declare interface Group {
  id: number;
  name: string;

  imageId: number | null;
  image: Image | null;

  createdAt: Date;
  updatedAt: Date;
}

export declare interface GroupResponse {
  group: Group;
}

export declare interface GroupFullResponse {
  group: GroupFull;
}

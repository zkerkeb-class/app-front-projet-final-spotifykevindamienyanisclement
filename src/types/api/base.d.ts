// Types de base communs
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image extends BaseEntity {
  formattedImageName: string;
  formattedImageURL: string;
  originalImageName: string;
  originalImageURL: string;
  avifImageName: string;
  avifImageURL: string;
  smallImageName: string;
  smallImageURL: string;
  mediumImageName: string;
  mediumImageURL: string;
  largeImageName: string;
  largeImageURL: string;
}

export interface Sound extends BaseEntity {
  duration: number;
  originalSoundName: string;
  originalSoundURL: string;
  wavSoundName: string;
  wavSoundURL: string;
  m4aSoundName: string;
  m4aSoundURL: string;
}

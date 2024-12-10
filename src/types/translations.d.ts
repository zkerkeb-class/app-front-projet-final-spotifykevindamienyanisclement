declare interface CommonTranslations {
  welcome: string;
  search: string;
  library: string;
  home: string;
  settings: string;
  language: string;
}

declare interface AuthTranslations {
  login: string;
  signup: string;
  logout: string;
}

declare interface PlayerTranslations {
  play: string;
  pause: string;
  next: string;
  previous: string;
  shuffle: string;
  repeat: string;
}

declare interface PlaylistTranslations {
  create: string;
  addToPlaylist: string;
  removeFromPlaylist: string;
}

declare interface Translations {
  common: CommonTranslations;
  auth: AuthTranslations;
  player: PlayerTranslations;
  playlist: PlaylistTranslations;
}

declare module '@/lib/i18n/*.json' {
  const value: Translations;
  export default value;
}

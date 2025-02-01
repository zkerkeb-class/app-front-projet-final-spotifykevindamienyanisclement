declare interface CommonTranslations {
  welcome: string;
  search: string;
  library: string;
  home: string;
  settings: string;
  language: string;
  darkMode: string;
  lightMode: string;
  popularArtists: string;
  email: string;
  password: string;
  or: string;
  showAll: string;
  share: string;
  loading: string;
  error: string;
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
  volume: string;
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
  accessibility: {
    skipToMain: string;
    settings: string;
    menu: string;
    highContrast: string;
    screenReader: string;
    keyboardNav: string;
    voiceMessages: string;
    enabled: string;
    disabled: string;
  };
}

declare module '@/lib/i18n/*.json' {
  const value: Translations;
  export default value;
}

export type TranslationKey = keyof Translations;

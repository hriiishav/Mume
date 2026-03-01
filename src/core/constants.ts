export const API_BASE_URL = 'https://saavn.sumit.co';

export const API_ENDPOINTS = {
  SEARCH_SONGS: '/api/search/songs',
  SEARCH: '/api/search',
  SONG: '/api/songs',
  SONG_BY_ID: (id: string) => `/api/songs/${id}`,
  SONG_SUGGESTIONS: (id: string) => `/api/songs/${id}/suggestions`,
} as const;

export const STORAGE_KEYS = {
  QUEUE: '@music_player_queue',
  RECENTLY_PLAYED: '@music_player_recently_played',
  FAVORITES: '@music_player_favorites',
  PLAYLISTS: '@music_player_playlists',
  THEME: '@music_player_theme',
} as const;

export const IMAGE_QUALITY = {
  SMALL: '50x50',
  MEDIUM: '150x150',
  LARGE: '500x500',
} as const;

export const AUDIO_QUALITY = {
  LOW: '96kbps',
  HIGH: '320kbps',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
} as const;

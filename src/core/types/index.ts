export interface SongImage {
  quality: string;
  link?: string;
  url?: string;
}

export interface SongAlbum {
  id: string;
  name: string;
  url?: string;
}

export interface SongArtist {
  id: string;
  name: string;
}

export interface Song {
  id: string;
  name: string;
  duration: string | number;
  language?: string;
  album: SongAlbum;
  primaryArtists?: string;
  primaryArtistsId?: string;
  artists?: {
    primary: SongArtist[];
  };
  image: SongImage[];
  downloadUrl: Array<{
    quality: string;
    link?: string;
    url?: string;
  }>;
  year?: string;
  playCount?: string;
}

export interface SearchSongsResponse {
  status?: string;
  success?: boolean;
  data: {
    results?: Song[];
    total?: number;
    start?: number;
  };
}

export interface SongDetailResponse {
  success: boolean;
  data: Song[];
}

export interface Artist {
  id: string;
  name: string;
  image?: SongImage[];
  url?: string;
}

export interface Album {
  id: string;
  name: string;
  year?: string;
  image?: SongImage[];
  primaryArtists?: string;
  artists?: { primary: SongArtist[] };
  songs?: Song[];
}

export interface SearchArtistsResponse {
  success?: boolean;
  data?: { results?: Artist[]; total?: number };
}

export interface SearchAlbumsResponse {
  success?: boolean;
  data?: { results?: Album[]; total?: number };
}

export interface AlbumDetailResponse {
  success?: boolean;
  data?: Album & { songs?: Song[] };
}

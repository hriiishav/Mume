import type {
  SearchSongsResponse,
  SongDetailResponse,
  SearchArtistsResponse,
  SearchAlbumsResponse,
  AlbumDetailResponse,
} from '../core/types';

const API_BASE_URL = 'https://saavn.sumit.co';

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const getSearchSongs = (query: string, page = 1) =>
  apiClient<SearchSongsResponse>(
    `/api/search/songs?query=${encodeURIComponent(query)}&page=${page}`
  );

export const getSongById = (id: string) =>
  apiClient<SongDetailResponse>(`/api/songs/${id}`);

export const getSearchArtists = (query: string, page = 1) =>
  apiClient<SearchArtistsResponse>(
    `/api/search/artists?query=${encodeURIComponent(query)}&page=${page}`
  );

export const getSearchAlbums = (query: string, page = 1) =>
  apiClient<SearchAlbumsResponse>(
    `/api/search/albums?query=${encodeURIComponent(query)}&page=${page}`
  );

export const getAlbumById = (id: string) =>
  apiClient<AlbumDetailResponse>(`/api/albums?id=${encodeURIComponent(id)}`);

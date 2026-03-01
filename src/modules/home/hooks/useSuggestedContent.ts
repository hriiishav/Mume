import { useQuery } from '@tanstack/react-query';
import { getSearchSongs } from '../../../api/apiClient';
import { getSearchArtists } from '../../../api/apiClient';

export function useSuggestedSongs() {
  return useQuery({
    queryKey: ['suggested', 'songs'],
    queryFn: () => getSearchSongs('hits', 1),
  });
}

export function useSuggestedArtists() {
  return useQuery({
    queryKey: ['suggested', 'artists'],
    queryFn: () => getSearchArtists('arijit', 1),
  });
}

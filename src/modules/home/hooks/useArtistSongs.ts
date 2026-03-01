import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchSongs } from '../../../api/apiClient';

type UseArtistSongsProps = {
  artistName: string;
  enabled?: boolean;
};

export function useArtistSongs({
  artistName,
  enabled = true,
}: UseArtistSongsProps) {
  return useInfiniteQuery({
    queryKey: ['artist', 'songs', artistName],
    queryFn: ({ pageParam = 1 }) => getSearchSongs(artistName, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const results = lastPage?.data?.results ?? [];
      const total = lastPage?.data?.total ?? 0;
      const loaded = allPages.reduce(
        (sum, p) => sum + (p?.data?.results?.length ?? 0),
        0
      );
      return loaded < total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: enabled && artistName.length > 0,
  });
}

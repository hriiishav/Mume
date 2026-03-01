import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchArtists } from '../../../api/apiClient';

type UseSearchArtistsProps = {
  query: string;
};

export function useSearchArtists({ query }: UseSearchArtistsProps) {
  return useInfiniteQuery({
    queryKey: ['search', 'artists', query],
    queryFn: ({ pageParam = 1 }) => getSearchArtists(query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const results = lastPage?.data?.results ?? [];
      const total = lastPage?.data?.total ?? 0;
      const loaded = allPages.reduce((sum, p) => sum + (p?.data?.results?.length ?? 0), 0);
      return loaded < total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: query.length > 0,
  });
}

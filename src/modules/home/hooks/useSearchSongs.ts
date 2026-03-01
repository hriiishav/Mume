import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchSongs } from '../../../api/apiClient';
import { PAGINATION } from '../../../core/constants';

type UseSearchSongsProps = {
  query: string;
};

export function useSearchSongs({ query }: UseSearchSongsProps) {
  return useInfiniteQuery({
    queryKey: ['search', 'songs', query],
    queryFn: ({ pageParam = 1 }) => getSearchSongs(query, pageParam),
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

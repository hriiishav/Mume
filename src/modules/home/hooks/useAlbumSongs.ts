import { useQuery } from '@tanstack/react-query';
import { getAlbumById } from '../../../api/apiClient';

type UseAlbumSongsProps = {
  albumId: string;
  enabled?: boolean;
};

export function useAlbumSongs({
  albumId,
  enabled = true,
}: UseAlbumSongsProps) {
  return useQuery({
    queryKey: ['album', albumId],
    queryFn: () => getAlbumById(albumId),
    enabled: enabled && albumId.length > 0,
  });
}

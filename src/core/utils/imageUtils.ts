import type { SongImage } from '../types';
import { IMAGE_QUALITY } from '../constants';

export function getSongImageUrl(
  images: SongImage[],
  quality: string = IMAGE_QUALITY.MEDIUM
): string {
  if (!images?.length) return '';
  const img = images.find((i) => i.quality === quality) ?? images[0];
  return img?.link ?? img?.url ?? '';
}

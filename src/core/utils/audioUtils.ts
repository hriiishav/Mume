import type { Song } from '../types';
import { AUDIO_QUALITY } from '../constants';

export function getSongAudioUrl(
  song: Song,
  quality: string = AUDIO_QUALITY.HIGH
): string {
  const urls = song?.downloadUrl ?? [];
  const match = urls.find((u) => u.quality === quality) ?? urls[0];
  return match?.link ?? match?.url ?? '';
}

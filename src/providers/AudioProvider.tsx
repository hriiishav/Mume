import React from 'react';
import { useAudioPlayer } from '../modules/player/hooks/useAudioPlayer';


export function AudioProvider({ children }: { children: React.ReactNode }) {
  useAudioPlayer(true);
  return <>{children}</>;
}

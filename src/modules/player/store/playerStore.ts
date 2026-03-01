import { create } from 'zustand';
import type { Song } from '../../../core/types';

type PlayerState = {
  currentSong: Song | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  shuffle: boolean;
  repeat: 'off' | 'one' | 'all';
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  reset: () => void;
};

const initialState = {
  currentSong: null,
  isPlaying: false,
  position: 0,
  duration: 0,
  shuffle: false,
  repeat: 'off' as const,
};

export const usePlayerStore = create<PlayerState>((set) => ({
  ...initialState,

  setCurrentSong: (song) => set({ currentSong: song }),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  setPosition: (position) => set({ position }),

  setDuration: (duration) => set({ duration }),

  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),

  cycleRepeat: () =>
    set((s) => ({
      repeat:
        s.repeat === 'off' ? 'one' : s.repeat === 'one' ? 'all' : 'off',
    })),

  reset: () => set(initialState),
}));

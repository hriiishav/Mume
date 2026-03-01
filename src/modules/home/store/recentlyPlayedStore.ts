import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Song } from '../../../core/types';
import { STORAGE_KEYS } from '../../../core/constants';

const MAX_RECENT = 20;

type RecentlyPlayedState = {
  songs: Song[];
  addSong: (song: Song) => void;
  loadFromStorage: () => Promise<void>;
  clear: () => void;
};

export const useRecentlyPlayedStore = create<RecentlyPlayedState>((set, get) => ({
  songs: [],

  addSong: (song) => {
    set((state) => {
      const filtered = state.songs.filter((s) => s.id !== song.id);
      const newSongs = [song, ...filtered].slice(0, MAX_RECENT);
      AsyncStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(newSongs));
      return { songs: newSongs };
    });
  },

  loadFromStorage: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
      if (stored) {
        const songs = JSON.parse(stored);
        set({ songs: Array.isArray(songs) ? songs : [] });
      }
    } catch {
      set({ songs: [] });
    }
  },

  clear: () => {
    set({ songs: [] });
    AsyncStorage.removeItem(STORAGE_KEYS.RECENTLY_PLAYED);
  },
}));

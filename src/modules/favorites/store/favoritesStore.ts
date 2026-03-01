import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Song } from '../../../core/types';
import { STORAGE_KEYS } from '../../../core/constants';

type FavoritesState = {
    songs: Song[];
    addFavorite: (song: Song) => void;
    removeFavorite: (songId: string) => void;
    isFavorite: (songId: string) => boolean;
    loadFromStorage: () => Promise<void>;
    toggleFavorite: (song: Song) => void;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    songs: [],

    addFavorite: (song) => {
        set((state) => {
            if (state.songs.some((s) => s.id === song.id)) return state;
            const newSongs = [song, ...state.songs];
            AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newSongs));
            return { songs: newSongs };
        });
    },

    removeFavorite: (songId) => {
        set((state) => {
            const newSongs = state.songs.filter((s) => s.id !== songId);
            AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newSongs));
            return { songs: newSongs };
        });
    },

    isFavorite: (songId) => {
        return get().songs.some((s) => s.id === songId);
    },

    toggleFavorite: (song) => {
        if (get().isFavorite(song.id)) {
            get().removeFavorite(song.id);
        } else {
            get().addFavorite(song);
        }
    },

    loadFromStorage: async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
            if (stored) {
                const songs = JSON.parse(stored);
                set({ songs: Array.isArray(songs) ? songs : [] });
            }
        } catch {
            set({ songs: [] });
        }
    },
}));

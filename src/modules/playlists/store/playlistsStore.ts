import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Song } from '../../../core/types';
import { STORAGE_KEYS } from '../../../core/constants';

export type Playlist = {
    id: string;
    name: string;
    songs: Song[];
};

type PlaylistsState = {
    playlists: Playlist[];
    createPlaylist: (name: string) => void;
    deletePlaylist: (playlistId: string) => void;
    addSongToPlaylist: (playlistId: string, song: Song) => void;
    removeSongFromPlaylist: (playlistId: string, songId: string) => void;
    loadFromStorage: () => Promise<void>;
};

export const usePlaylistsStore = create<PlaylistsState>((set, get) => ({
    playlists: [],

    createPlaylist: (name) => {
        set((state) => {
            const newPlaylist: Playlist = {
                id: Date.now().toString(),
                name,
                songs: [],
            };
            const newPlaylists = [...state.playlists, newPlaylist];
            AsyncStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(newPlaylists));
            return { playlists: newPlaylists };
        });
    },

    deletePlaylist: (playlistId) => {
        set((state) => {
            const newPlaylists = state.playlists.filter((p) => p.id !== playlistId);
            AsyncStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(newPlaylists));
            return { playlists: newPlaylists };
        });
    },

    addSongToPlaylist: (playlistId, song) => {
        set((state) => {
            const newPlaylists = state.playlists.map((p) => {
                if (p.id === playlistId) {
                    if (p.songs.some((s) => s.id === song.id)) return p;
                    return { ...p, songs: [...p.songs, song] };
                }
                return p;
            });
            AsyncStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(newPlaylists));
            return { playlists: newPlaylists };
        });
    },

    removeSongFromPlaylist: (playlistId, songId) => {
        set((state) => {
            const newPlaylists = state.playlists.map((p) => {
                if (p.id === playlistId) {
                    return { ...p, songs: p.songs.filter((s) => s.id !== songId) };
                }
                return p;
            });
            AsyncStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(newPlaylists));
            return { playlists: newPlaylists };
        });
    },

    loadFromStorage: async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEYS.PLAYLISTS);
            if (stored) {
                const playlists = JSON.parse(stored);
                set({ playlists: Array.isArray(playlists) ? playlists : [] });
            }
        } catch {
            set({ playlists: [] });
        }
    },
}));

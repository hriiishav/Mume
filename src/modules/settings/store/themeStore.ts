import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '../../../core/constants';

export type ThemeMode = 'light' | 'dark';

type ThemeState = {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    loadFromStorage: () => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
    themeMode: 'dark', // Default to dark as requested

    setThemeMode: (mode) => {
        set({ themeMode: mode });
        AsyncStorage.setItem(STORAGE_KEYS.THEME, mode);
    },

    loadFromStorage: async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
            if (stored === 'light' || stored === 'dark') {
                set({ themeMode: stored });
            }
        } catch {
            set({ themeMode: 'dark' });
        }
    },
}));

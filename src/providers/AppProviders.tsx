import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components/native';
import { queryClient } from '../api/queryClient';
import { darkTheme, lightTheme } from '../core/theme';
import { useQueueStore } from '../modules/queue/store/queueStore';
import { useRecentlyPlayedStore } from '../modules/home/store/recentlyPlayedStore';
import { useFavoritesStore } from '../modules/favorites/store/favoritesStore';
import { usePlaylistsStore } from '../modules/playlists/store/playlistsStore';
import { useThemeStore } from '../modules/settings/store/themeStore';
import { AudioProvider } from './AudioProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const loadQueue = useQueueStore((s) => s.loadQueue);
  const loadRecentlyPlayed = useRecentlyPlayedStore((s) => s.loadFromStorage);
  const loadFavorites = useFavoritesStore((s) => s.loadFromStorage);
  const loadPlaylists = usePlaylistsStore((s) => s.loadFromStorage);
  const loadTheme = useThemeStore((s) => s.loadFromStorage);
  const themeMode = useThemeStore((s) => s.themeMode);

  useEffect(() => {
    loadQueue();
    loadRecentlyPlayed();
    loadFavorites();
    loadPlaylists();
    loadTheme();
  }, [loadQueue, loadRecentlyPlayed, loadFavorites, loadPlaylists, loadTheme]);

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AudioProvider>{children}</AudioProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

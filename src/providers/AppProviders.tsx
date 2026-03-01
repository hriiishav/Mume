import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../api/queryClient';
import { useQueueStore } from '../modules/queue/store/queueStore';
import { useRecentlyPlayedStore } from '../modules/home/store/recentlyPlayedStore';
import { AudioProvider } from './AudioProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const loadQueue = useQueueStore((s) => s.loadQueue);
  const loadRecentlyPlayed = useRecentlyPlayedStore((s) => s.loadFromStorage);

  useEffect(() => {
    loadQueue();
    loadRecentlyPlayed();
  }, [loadQueue, loadRecentlyPlayed]);

  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>{children}</AudioProvider>
    </QueryClientProvider>
  );
}

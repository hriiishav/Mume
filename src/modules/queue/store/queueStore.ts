import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Song } from '../../../core/types';
import { STORAGE_KEYS } from '../../../core/constants';

type QueueState = {
  queue: Song[];
  currentIndex: number;
  setQueue: (songs: Song[]) => void;
  addToQueue: (song: Song) => void;
  playNext: (song: Song) => void;
  addAndPlay: (song: Song) => void;
  addMultipleToQueue: (songs: Song[]) => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
  setCurrentIndex: (index: number) => void;
  clearQueue: () => void;
  loadQueue: () => Promise<void>;
  persistQueue: () => Promise<void>;
};

const loadStoredQueue = async (): Promise<{ queue: Song[]; index: number }> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.QUEUE);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { queue: parsed.queue || [], index: parsed.currentIndex ?? 0 };
    }
  } catch {
    // ignore
  }
  return { queue: [], index: 0 };
};

export const useQueueStore = create<QueueState>((set, get) => ({
  queue: [],
  currentIndex: 0,

  setQueue: (songs) => {
    set({ queue: songs, currentIndex: 0 });
    get().persistQueue();
  },

  addToQueue: (song) => {
    const { queue } = get();
    if (queue.some((s) => s.id === song.id)) return;
    const newQueue = [...queue, song];
    set({ queue: newQueue });
    get().persistQueue();
  },

  playNext: (song) => {
    const { queue, currentIndex } = get();
    if (queue.some((s) => s.id === song.id)) return;
    const insertAt = currentIndex + 1;
    const newQueue = [
      ...queue.slice(0, insertAt),
      song,
      ...queue.slice(insertAt),
    ];
    set({ queue: newQueue });
    get().persistQueue();
  },

  addAndPlay: (song) => {
    const { queue } = get();
    const existingIdx = queue.findIndex((s) => s.id === song.id);
    if (existingIdx >= 0) {
      set({ currentIndex: existingIdx });
    } else {
      const newQueue = [...queue, song];
      set({ queue: newQueue, currentIndex: newQueue.length - 1 });
      get().persistQueue();
    }
  },

  addMultipleToQueue: (songs) => {
    const { queue } = get();
    const existingIds = new Set(queue.map((s) => s.id));
    const toAdd = songs.filter((s) => !existingIds.has(s.id));
    if (toAdd.length === 0) return;
    const newQueue = [...queue, ...toAdd];
    set({ queue: newQueue });
    get().persistQueue();
  },

  removeFromQueue: (index) => {
    const { queue, currentIndex } = get();
    const newQueue = queue.filter((_, i) => i !== index);
    let newIndex = currentIndex;
    if (index < currentIndex) newIndex--;
    else if (index === currentIndex && newIndex >= newQueue.length)
      newIndex = Math.max(0, newQueue.length - 1);
    set({ queue: newQueue, currentIndex: newIndex });
    get().persistQueue();
  },

  reorderQueue: (fromIndex, toIndex) => {
    const { queue, currentIndex } = get();
    const newQueue = [...queue];
    const [removed] = newQueue.splice(fromIndex, 1);
    newQueue.splice(toIndex, 0, removed);
    let newIndex = currentIndex;
    if (fromIndex === currentIndex) newIndex = toIndex;
    else if (fromIndex < currentIndex && toIndex >= currentIndex) newIndex--;
    else if (fromIndex > currentIndex && toIndex <= currentIndex) newIndex++;
    set({ queue: newQueue, currentIndex: newIndex });
    get().persistQueue();
  },

  setCurrentIndex: (index) => set({ currentIndex: index }),

  clearQueue: () => {
    set({ queue: [], currentIndex: 0 });
    get().persistQueue();
  },

  loadQueue: async () => {
    const { queue, index } = await loadStoredQueue();
    set({ queue, currentIndex: index });
  },

  persistQueue: async () => {
    const { queue, currentIndex } = get();
    await AsyncStorage.setItem(
      STORAGE_KEYS.QUEUE,
      JSON.stringify({ queue, currentIndex })
    );
  },
}));

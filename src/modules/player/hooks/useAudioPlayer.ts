import { useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { usePlayerStore } from '../store/playerStore';
import { useQueueStore } from '../../queue/store/queueStore';
import { useRecentlyPlayedStore } from '../../home/store/recentlyPlayedStore';
import { getSongAudioUrl } from '../../../core/utils/audioUtils';

let globalSound: Audio.Sound | null = null;

export function useAudioPlayer(isDriver: boolean = false) {
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const setPosition = usePlayerStore((s) => s.setPosition);
  const setDuration = usePlayerStore((s) => s.setDuration);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);

  const playNext = useCallback(() => {
    const { queue: q } = useQueueStore.getState();
    if (q.length === 0) return;
    const { currentIndex: idx } = useQueueStore.getState();
    const nextIndex = (idx + 1) % q.length;
    const nextSong = q[nextIndex];
    useQueueStore.getState().setCurrentIndex(nextIndex);
    usePlayerStore.getState().setCurrentSong(nextSong);
    usePlayerStore.getState().setIsPlaying(true);
    useRecentlyPlayedStore.getState().addSong(nextSong);
  }, []);

  const playPrev = useCallback(() => {
    const { queue: q } = useQueueStore.getState();
    if (q.length === 0) return;
    const { currentIndex: idx } = useQueueStore.getState();
    const prevIndex = idx <= 0 ? q.length - 1 : idx - 1;
    const prevSong = q[prevIndex];
    useQueueStore.getState().setCurrentIndex(prevIndex);
    usePlayerStore.getState().setCurrentSong(prevSong);
    usePlayerStore.getState().setIsPlaying(true);
    useRecentlyPlayedStore.getState().addSong(prevSong);
  }, []);

  useEffect(() => {
    if (!isDriver || !currentSong) return;

    const url = getSongAudioUrl(currentSong);
    if (!url) return;

    let isMounted = true;

    const loadAndPlay = async () => {
      try {
        if (globalSound) {
          await globalSound.unloadAsync();
          globalSound = null;
        }

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: isPlaying, progressUpdateIntervalMillis: 500 }
        );

        if (!isMounted) {
          await sound.unloadAsync();
          return;
        }

        globalSound = sound;

        const duration = (await sound.getStatusAsync()) as { durationMillis?: number };
        if (duration?.durationMillis) {
          setDuration(duration.durationMillis / 1000);
        }

        let lastPositionUpdate = 0;
        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;
          const now = Date.now();
          if (status.didJustFinish && !status.isLooping) {
            playNext();
          } else if (now - lastPositionUpdate >= 500) {
            lastPositionUpdate = now;
            setPosition(status.positionMillis / 1000);
            if (status.durationMillis) {
              setDuration(status.durationMillis / 1000);
            }
          }
        });
      } catch (e) {
        console.error('Audio load error:', e);
      }
    };

    loadAndPlay();
    return () => {
      isMounted = false;
      // We don't unload here to keep playback across screens
    };
  }, [currentSong?.id, isDriver]);

  useEffect(() => {
    if (!isDriver || !globalSound) return;
    if (isPlaying) {
      globalSound.playAsync();
    } else {
      globalSound.pauseAsync();
    }
  }, [isPlaying, isDriver]);

  const seek = useCallback(async (position: number) => {
    if (globalSound) {
      const clamped = Math.max(0, position);
      await globalSound.setPositionAsync(clamped * 1000);
      setPosition(clamped);
    }
  }, [setPosition]);

  const seekBack10 = useCallback(async () => {
    const pos = usePlayerStore.getState().position;
    await seek(Math.max(0, pos - 10));
  }, [seek]);

  const seekForward10 = useCallback(async () => {
    const pos = usePlayerStore.getState().position;
    const dur = usePlayerStore.getState().duration;
    await seek(Math.min(dur || 0, pos + 10));
  }, [seek]);

  return { playNext, playPrev, seek, seekBack10, seekForward10 };
}

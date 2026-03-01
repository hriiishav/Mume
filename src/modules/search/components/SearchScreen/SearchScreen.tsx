import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSearchSongs } from '../../../home/hooks/useSearchSongs';
import { SongListItem } from '../../../home/components/SongListItem';
import { SongContextMenu } from '../../../home/components/SongContextMenu';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { useRecentlyPlayedStore } from '../../../home/store/recentlyPlayedStore';
import type { Song } from '../../../../core/types';
import * as S from './styled';

export function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [contextSong, setContextSong] = useState<Song | null>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchSongs({ query: debouncedQuery });

  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const addAndPlay = useQueueStore((s) => s.addAndPlay);
  const addToQueue = useQueueStore((s) => s.addToQueue);
  const playNext = useQueueStore((s) => s.playNext);

  const songs: Song[] = useMemo(
    () => data?.pages?.flatMap((p) => p?.data?.results ?? []) ?? [],
    [data]
  );

  const handleSearch = useCallback(() => {
    setDebouncedQuery(query.trim());
    Keyboard.dismiss();
  }, [query]);

  const handlePlaySong = useCallback(
    (song: Song) => {
      addAndPlay(song);
      setCurrentSong(song);
      setIsPlaying(true);
      useRecentlyPlayedStore.getState().addSong(song);
    },
    [addAndPlay, setCurrentSong, setIsPlaying]
  );

  const handleAddToQueue = useCallback(
    (song: Song) => {
      addToQueue(song);
    },
    [addToQueue]
  );

  const handlePlayNext = useCallback(
    (song: Song) => {
      playNext(song);
    },
    [playNext]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <S.Container>
      <S.Header>
        <S.BackBtn onPress={() => navigation.goBack()}>
          <S.BackIcon>←</S.BackIcon>
        </S.BackBtn>
        <S.SearchRow>
          <S.Input
            placeholder="Search songs..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={(text: string) => {
              setQuery(text);
              if (text.trim() === '') setDebouncedQuery('');
            }}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
          />
          <S.SearchBtn onPress={handleSearch}>
            <S.SearchBtnText>Search</S.SearchBtnText>
          </S.SearchBtn>
        </S.SearchRow>
      </S.Header>

      {!debouncedQuery ? (
        <S.Placeholder>
          <S.PlaceholderText>Type to search for songs</S.PlaceholderText>
        </S.Placeholder>
      ) : isLoading ? (
        <S.Placeholder>
          <ActivityIndicator size="large" color="#f97316" />
        </S.Placeholder>
      ) : songs.length === 0 ? (
        <S.Placeholder>
          <S.PlaceholderText>No songs found</S.PlaceholderText>
        </S.Placeholder>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SongListItem
              song={item}
              isPlaying={currentSong?.id === item.id && isPlaying}
              onPress={() => handlePlaySong(item)}
              onPlayPress={() => handlePlaySong(item)}
              onMenuPress={() => setContextSong(item)}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#f97316" />
            ) : null
          }
        />
      )}

      <SongContextMenu
        visible={!!contextSong}
        song={contextSong}
        onClose={() => setContextSong(null)}
        onPlayNext={handlePlayNext}
        onAddToQueue={handleAddToQueue}
      />
    </S.Container>
  );
}

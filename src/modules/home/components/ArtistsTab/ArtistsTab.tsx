import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { useSearchArtists } from '../../hooks/useSearchArtists';
import { ArtistContextMenu } from '../ArtistContextMenu';
import { getSearchSongs } from '../../../../api/apiClient';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { useRecentlyPlayedStore } from '../../store/recentlyPlayedStore';
import type { Artist } from '../../../../core/types';
import * as S from './styled';

const DEFAULT_ARTISTS_QUERY = 'a';

function getArtistImageUrl(artist: Artist): string {
  const img = artist.image?.[0];
  return img?.url ?? img?.link ?? '';
}

export function ArtistsTab() {
  const theme: any = useTheme();
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [contextArtist, setContextArtist] = useState<Artist | null>(null);

  const effectiveQuery = debouncedQuery.trim() || DEFAULT_ARTISTS_QUERY;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchArtists({ query: effectiveQuery });

  const artists: Artist[] = useMemo(
    () => data?.pages?.flatMap((p) => p?.data?.results ?? []) ?? [],
    [data]
  );

  const totalCount = data?.pages?.[0]?.data?.total ?? artists.length;

  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const addAndPlay = useQueueStore((s) => s.addAndPlay);
  const addToQueue = useQueueStore((s) => s.addToQueue);
  const addMultipleToQueue = useQueueStore((s) => s.addMultipleToQueue);
  const playNext = useQueueStore((s) => s.playNext);

  const handleSearch = useCallback(() => {
    setDebouncedQuery(query.trim());
    Keyboard.dismiss();
  }, [query]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleArtistPlay = useCallback(
    async (artist: Artist) => {
      const res = await getSearchSongs(artist.name, 1);
      const songs = res?.data?.results ?? [];
      if (songs.length === 0) return;
      addAndPlay(songs[0]);
      songs.slice(1).forEach((s) => addToQueue(s));
      setCurrentSong(songs[0]);
      setIsPlaying(true);
      useRecentlyPlayedStore.getState().addSong(songs[0]);
    },
    [addAndPlay, addToQueue, setCurrentSong, setIsPlaying]
  );

  const handleArtistPlayNext = useCallback(
    async (artist: Artist) => {
      const res = await getSearchSongs(artist.name, 1);
      const songs = res?.data?.results ?? [];
      songs.forEach((s) => playNext(s));
    },
    [playNext]
  );

  const handleArtistAddToQueue = useCallback(
    async (artist: Artist) => {
      const res = await getSearchSongs(artist.name, 1);
      const songs = res?.data?.results ?? [];
      addMultipleToQueue(songs);
    },
    [addMultipleToQueue]
  );

  const handleArtistPress = useCallback(
    (artist: Artist) => {
      (navigation as any).navigate('ArtistDetail', { artist });
    },
    [navigation]
  );

  const renderListHeader = useCallback(() => {
    if (artists.length === 0) return null;
    return (
      <S.ListHeader>
        <S.ArtistCount>{totalCount} artists</S.ArtistCount>
      </S.ListHeader>
    );
  }, [artists.length, totalCount]);

  return (
    <S.Container>
      <S.SearchRow>
        <S.Input
          placeholder="Search artists..."
          placeholderTextColor={theme.textMuted}
          value={query}
          onChangeText={(text: string) => {
            setQuery(text);
            if (text.trim() === '') setDebouncedQuery('');
          }}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <S.SearchBtn onPress={handleSearch}>
          <S.SearchBtnText>Search</S.SearchBtnText>
        </S.SearchBtn>
      </S.SearchRow>

      {isLoading && artists.length === 0 ? (
        <S.Placeholder>
          <ActivityIndicator size="large" color={theme.primary} />
        </S.Placeholder>
      ) : artists.length === 0 ? (
        <S.Placeholder>
          <S.PlaceholderText>No artists found</S.PlaceholderText>
        </S.Placeholder>
      ) : (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          renderItem={({ item }) => (
            <S.ArtistRow>
              <S.ArtistRowTouchable
                activeOpacity={0.7}
                onPress={() => handleArtistPress(item)}
              >
                <S.ArtistImage source={{ uri: getArtistImageUrl(item) }} />
                <S.ArtistName numberOfLines={1}>{item.name}</S.ArtistName>
              </S.ArtistRowTouchable>
              <S.MenuBtn onPress={() => setContextArtist(item)}>
                <Ionicons name="ellipsis-vertical" size={20} color={theme.textMuted} />
              </S.MenuBtn>
            </S.ArtistRow>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color={theme.primary} />
            ) : null
          }
        />
      )}

      <ArtistContextMenu
        visible={!!contextArtist}
        artist={contextArtist}
        onClose={() => setContextArtist(null)}
        onPlay={handleArtistPlay}
        onPlayNext={handleArtistPlayNext}
        onAddToQueue={handleArtistAddToQueue}
      />
    </S.Container>
  );
}

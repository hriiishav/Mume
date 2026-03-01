import React, { useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Keyboard,
  Modal,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import { useSearchSongs } from '../../hooks/useSearchSongs';
import { SongListItem } from '../SongListItem';
import { SongContextMenu } from '../SongContextMenu';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { useRecentlyPlayedStore } from '../../store/recentlyPlayedStore';
import { AddToPlaylistModal } from '../../../playlists/components/AddToPlaylistModal/AddToPlaylistModal';
import type { Song } from '../../../../core/types';
import * as S from './styled';

export type SortOption =
  | 'ascending'
  | 'descending'
  | 'artist'
  | 'album'
  | 'year';

const SORT_LABELS: Record<SortOption, string> = {
  ascending: 'Ascending',
  descending: 'Descending',
  artist: 'Artist',
  album: 'Album',
  year: 'Year',
};

const DEFAULT_SONGS_QUERY = 'hits';

const SortModalContent = styled.View`
  position: absolute;
  top: 120px;
  right: 16px;
  left: 16px;
  background-color: ${(props: any) => props.theme.card};
  border-radius: 12px;
  padding: 8px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 5;
`;

function sortSongs(songs: Song[], option: SortOption): Song[] {
  const sorted = [...songs];
  const getTitle = (s: Song) => s.name.toLowerCase();
  const getArtist = (s: Song) =>
    (s.primaryArtists ??
      s.artists?.primary?.map((a) => a.name).join(', ') ??
      s.album?.name ??
      ''
    ).toLowerCase();
  const getAlbum = (s: Song) => (s.album?.name ?? '').toLowerCase();
  const getYear = (s: Song) => s.year ?? '';

  switch (option) {
    case 'ascending':
      return sorted.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
    case 'descending':
      return sorted.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));
    case 'artist':
      return sorted.sort((a, b) => getArtist(a).localeCompare(getArtist(b)));
    case 'album':
      return sorted.sort((a, b) => getAlbum(a).localeCompare(getAlbum(b)));
    case 'year':
      return sorted.sort((a, b) => getYear(b).localeCompare(getYear(a)));
    default:
      return sorted;
  }
}

export function SongsTab() {
  const theme: any = useTheme();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('ascending');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [contextSong, setContextSong] = useState<Song | null>(null);
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);

  const effectiveQuery = debouncedQuery.trim() || DEFAULT_SONGS_QUERY;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchSongs({ query: effectiveQuery });

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

  const totalCount =
    data?.pages?.[0]?.data?.total ?? songs.length;

  const sortedSongs = useMemo(
    () => sortSongs(songs, sortOption),
    [songs, sortOption]
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

  const renderListHeader = useCallback(() => {
    if (songs.length === 0) return null;
    return (
      <S.ListHeader>
        <S.SongCount>{totalCount} songs</S.SongCount>
        <S.SortBtn onPress={() => setSortModalVisible(true)}>
          <S.SortLabel>{SORT_LABELS[sortOption]}</S.SortLabel>
          <Ionicons name="swap-vertical" size={18} color={theme.primary} />
        </S.SortBtn>
      </S.ListHeader>
    );
  }, [songs.length, sortOption, totalCount, theme.primary]);

  return (
    <S.Container>
      <S.SearchRow>
        <S.Input
          placeholder="Search songs..."
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

      {isLoading && songs.length === 0 ? (
        <S.Placeholder>
          <ActivityIndicator size="large" color={theme.primary} />
        </S.Placeholder>
      ) : songs.length === 0 ? (
        <S.Placeholder>
          <S.PlaceholderText>No songs found</S.PlaceholderText>
        </S.Placeholder>
      ) : (
        <FlatList
          data={sortedSongs}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          renderItem={({ item }) => (
            <SongListItem
              song={item}
              isPlaying={
                currentSong?.id === item.id && isPlaying
              }
              onPress={() => handlePlaySong(item)}
              onPlayPress={() => handlePlaySong(item)}
              onMenuPress={() => setContextSong(item)}
            />
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

      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <S.SortModalOverlay
          onPress={() => setSortModalVisible(false)}
        >
          <SortModalContent>
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <S.SortOption
                key={opt}
                onPress={() => {
                  setSortOption(opt);
                  setSortModalVisible(false);
                }}
              >
                <Ionicons
                  name={
                    sortOption === opt
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={22}
                  color={theme.primary}
                />
                <S.SortOptionText>{SORT_LABELS[opt]}</S.SortOptionText>
              </S.SortOption>
            ))}
          </SortModalContent>
        </S.SortModalOverlay>
      </Modal>

      <SongContextMenu
        visible={!!contextSong}
        song={contextSong}
        onClose={() => setContextSong(null)}
        onPlayNext={handlePlayNext}
        onAddToQueue={handleAddToQueue}
        onAddToPlaylist={() => setPlaylistModalVisible(true)}
      />

      <AddToPlaylistModal
        visible={playlistModalVisible}
        song={contextSong}
        onClose={() => setPlaylistModalVisible(false)}
      />
    </S.Container>
  );
}

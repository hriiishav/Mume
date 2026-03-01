import React, { useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Modal,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSearchAlbums } from '../../hooks/useSearchAlbums';
import { AlbumContextMenu } from '../AlbumContextMenu';
import { getAlbumById, getSearchSongs } from '../../../../api/apiClient';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { useRecentlyPlayedStore } from '../../store/recentlyPlayedStore';
import type { Album } from '../../../../core/types';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import * as S from './styled';

export type AlbumSortOption = 'dateAsc' | 'dateDesc' | 'name' | 'artist' | 'year';

const SORT_LABELS: Record<AlbumSortOption, string> = {
  dateAsc: 'Date Modified',
  dateDesc: 'Date Modified',
  name: 'Name',
  artist: 'Artist',
  year: 'Year',
};

const DEFAULT_ALBUMS_QUERY = 'a';

function sortAlbums(albums: Album[], option: AlbumSortOption): Album[] {
  const sorted = [...albums];
  const getName = (a: Album) => a.name.toLowerCase();
  const getArtist = (a: Album) =>
    (a.primaryArtists ??
      a.artists?.primary?.map((p) => p.name).join(', ') ??
      ''
    ).toLowerCase();
  const getYear = (a: Album) => a.year ?? '';

  switch (option) {
    case 'dateAsc':
      return sorted.sort((a, b) => getName(a).localeCompare(getName(b)));
    case 'dateDesc':
      return sorted.sort((a, b) => getName(b).localeCompare(getName(a)));
    case 'name':
      return sorted.sort((a, b) => getName(a).localeCompare(getName(b)));
    case 'artist':
      return sorted.sort((a, b) => getArtist(a).localeCompare(getArtist(b)));
    case 'year':
      return sorted.sort((a, b) => getYear(b).localeCompare(getYear(a)));
    default:
      return sorted;
  }
}

export function AlbumsTab() {
  const navigation = useNavigation();
  const [debouncedQuery] = useState(DEFAULT_ALBUMS_QUERY);
  const [sortOption, setSortOption] = useState<AlbumSortOption>('dateAsc');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [contextAlbum, setContextAlbum] = useState<Album | null>(null);

  const effectiveQuery = debouncedQuery?.trim() || DEFAULT_ALBUMS_QUERY;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchAlbums({ query: effectiveQuery });

  const albums: Album[] = useMemo(
    () => data?.pages?.flatMap((p) => p?.data?.results ?? []) ?? [],
    [data]
  );

  const sortedAlbums = useMemo(
    () => sortAlbums(albums, sortOption),
    [albums, sortOption]
  );

  const totalCount = data?.pages?.[0]?.data?.total ?? albums.length;

  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const addAndPlay = useQueueStore((s) => s.addAndPlay);
  const addToQueue = useQueueStore((s) => s.addToQueue);
  const addMultipleToQueue = useQueueStore((s) => s.addMultipleToQueue);
  const playNext = useQueueStore((s) => s.playNext);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAlbumPress = useCallback(
    (album: Album) => {
      (navigation as any).navigate('AlbumDetail', { album });
    },
    [navigation]
  );

  const fetchAlbumSongs = useCallback(async (album: Album) => {
    const res = await getAlbumById(album.id);
    let songs = res?.data?.songs ?? [];
    if (songs.length === 0) {
      const searchRes = await getSearchSongs(album.name, 1);
      songs = searchRes?.data?.results ?? [];
    }
    return Array.isArray(songs) ? songs : [];
  }, []);

  const handleAlbumPlay = useCallback(
    async (album: Album) => {
      const songs = await fetchAlbumSongs(album);
      if (songs.length === 0) return;
      addAndPlay(songs[0]);
      songs.slice(1).forEach((s) => addToQueue(s));
      setCurrentSong(songs[0]);
      setIsPlaying(true);
      useRecentlyPlayedStore.getState().addSong(songs[0]);
    },
    [fetchAlbumSongs, addAndPlay, addToQueue, setCurrentSong, setIsPlaying]
  );

  const handleAlbumPlayNext = useCallback(
    async (album: Album) => {
      const songs = await fetchAlbumSongs(album);
      songs.forEach((s) => playNext(s));
    },
    [fetchAlbumSongs, playNext]
  );

  const handleAlbumAddToQueue = useCallback(
    async (album: Album) => {
      const songs = await fetchAlbumSongs(album);
      addMultipleToQueue(songs);
    },
    [fetchAlbumSongs, addMultipleToQueue]
  );

  const renderListHeader = useCallback(() => {
    if (albums.length === 0) return null;
    return (
      <S.ListHeader>
        <S.AlbumCount>{totalCount} albums</S.AlbumCount>
        <S.SortBtn onPress={() => setSortModalVisible(true)}>
          <S.SortLabel>{SORT_LABELS[sortOption]}</S.SortLabel>
          <Ionicons name="swap-vertical" size={18} color="#f97316" />
        </S.SortBtn>
      </S.ListHeader>
    );
  }, [albums.length, totalCount, sortOption]);

  const renderAlbum = useCallback(
    ({ item }: { item: Album }) => {
      const imageUrl = item.image ? getSongImageUrl(item.image) : '';
      const artist =
        item.primaryArtists ??
        item.artists?.primary?.map((a) => a.name).join(', ') ??
        '';
      const songCount = item.songs?.length;
      const songCountStr = songCount != null ? `${songCount} songs` : '— songs';

      return (
        <S.AlbumCard>
          <S.AlbumCardTouchable
            activeOpacity={0.7}
            onPress={() => handleAlbumPress(item)}
          >
            <S.AlbumArtwork source={{ uri: imageUrl }} />
            <S.AlbumInfo>
              <S.AlbumTitleRow>
                <S.AlbumTitle numberOfLines={1}>{item.name}</S.AlbumTitle>
                <S.MenuBtn onPress={() => setContextAlbum(item)}>
                  <Ionicons name="ellipsis-vertical" size={18} color="#6b7280" />
                </S.MenuBtn>
              </S.AlbumTitleRow>
              <S.AlbumArtist numberOfLines={1}>
                {artist} {item.year ? `| ${item.year}` : ''}
              </S.AlbumArtist>
              <S.AlbumSongCount>{songCountStr}</S.AlbumSongCount>
            </S.AlbumInfo>
          </S.AlbumCardTouchable>
        </S.AlbumCard>
      );
    },
    [handleAlbumPress]
  );

  return (
    <S.Container>
      {isLoading && albums.length === 0 ? (
        <S.Placeholder>
          <ActivityIndicator size="large" color="#f97316" />
        </S.Placeholder>
      ) : albums.length === 0 ? (
        <S.Placeholder>
          <S.PlaceholderText>No albums found</S.PlaceholderText>
        </S.Placeholder>
      ) : (
        <FlatList
          data={sortedAlbums}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          renderItem={renderAlbum}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginBottom: 20,
          }}
          contentContainerStyle={{ paddingBottom: 24 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#f97316" />
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
        <S.SortModalOverlay onPress={() => setSortModalVisible(false)}>
          <View style={sortModalStyle}>
            {(Object.keys(SORT_LABELS) as AlbumSortOption[]).map((opt) => (
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
                  color="#f97316"
                />
                <S.SortOptionText>{SORT_LABELS[opt]}</S.SortOptionText>
              </S.SortOption>
            ))}
          </View>
        </S.SortModalOverlay>
      </Modal>

      <AlbumContextMenu
        visible={!!contextAlbum}
        album={contextAlbum}
        onClose={() => setContextAlbum(null)}
        onPlay={handleAlbumPlay}
        onPlayNext={handleAlbumPlayNext}
        onAddToQueue={handleAlbumAddToQueue}
      />
    </S.Container>
  );
}

const sortModalStyle = {
  position: 'absolute' as const,
  top: 120,
  right: 16,
  left: 16,
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
};

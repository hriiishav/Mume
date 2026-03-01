import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useArtistSongs } from '../../../home/hooks/useArtistSongs';
import { SongListItem } from '../../../home/components/SongListItem';
import { SongContextMenu } from '../../../home/components/SongContextMenu';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { useRecentlyPlayedStore } from '../../../home/store/recentlyPlayedStore';
import type { Artist } from '../../../../core/types';
import type { Song } from '../../../../core/types';
import * as S from './styled';

function getArtistImageUrl(artist: Artist): string {
  const img = artist.image?.[0];
  return img?.url ?? img?.link ?? '';
}

type ArtistDetailParams = {
  ArtistDetail: { artist: Artist };
};

export function ArtistDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ArtistDetailParams, 'ArtistDetail'>>();
  const { artist } = route.params;

  const [contextSong, setContextSong] = React.useState<Song | null>(null);

  const { data, isLoading } = useArtistSongs({ artistName: artist.name });

  const songs: Song[] = useMemo(
    () => data?.pages?.flatMap((p) => p?.data?.results ?? []) ?? [],
    [data]
  );

  const totalDuration = useMemo(() => {
    return songs.reduce((acc, s) => {
      const d = typeof s.duration === 'string' ? parseInt(s.duration, 10) : s.duration;
      return acc + d;
    }, 0);
  }, [songs]);

  const durationMins = Math.floor(totalDuration / 60);
  const durationSecs = totalDuration % 60;
  const durationStr = `${durationMins.toString().padStart(2, '0')}:${durationSecs.toString().padStart(2, '0')} mins`;

  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const addAndPlay = useQueueStore((s) => s.addAndPlay);
  const addToQueue = useQueueStore((s) => s.addToQueue);
  const playNext = useQueueStore((s) => s.playNext);

  const handleAddToQueue = (song: Song) => addToQueue(song);
  const handlePlayNext = (song: Song) => playNext(song);

  const handlePlaySong = (song: Song) => {
    addAndPlay(song);
    setCurrentSong(song);
    setIsPlaying(true);
    useRecentlyPlayedStore.getState().addSong(song);
  };

  const handlePlayAll = () => {
    if (songs.length === 0) return;
    addAndPlay(songs[0]);
    songs.slice(1).forEach((s) => addToQueue(s));
    setCurrentSong(songs[0]);
    setIsPlaying(true);
    useRecentlyPlayedStore.getState().addSong(songs[0]);
  };

  const handleShuffle = () => {
    if (songs.length === 0) return;
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    addAndPlay(shuffled[0]);
    shuffled.slice(1).forEach((s) => addToQueue(s));
    setCurrentSong(shuffled[0]);
    setIsPlaying(true);
    useRecentlyPlayedStore.getState().addSong(shuffled[0]);
  };

  const imageUrl = getArtistImageUrl(artist);

  return (
    <S.Container>
      <S.Header>
        <S.BackBtn onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </S.BackBtn>
        <S.HeaderRight>
          <S.BackBtn>
            <Ionicons name="search-outline" size={24} color="#1f2937" />
          </S.BackBtn>
          <S.BackBtn>
            <Ionicons name="ellipsis-vertical" size={24} color="#1f2937" />
          </S.BackBtn>
        </S.HeaderRight>
      </S.Header>

      <S.ArtistSection>
        <S.Artwork source={{ uri: imageUrl }} />
        <S.ArtistName>{artist.name}</S.ArtistName>
        <S.Stats>
          {songs.length} Songs | {durationStr}
        </S.Stats>
        <S.ActionRow>
          <S.ActionBtn onPress={handleShuffle}>
            <Ionicons name="shuffle" size={20} color="#fff" />
            <S.ActionBtnText>Shuffle</S.ActionBtnText>
          </S.ActionBtn>
          <S.ActionBtn onPress={handlePlayAll}>
            <Ionicons name="play" size={20} color="#fff" />
            <S.ActionBtnText>Play</S.ActionBtnText>
          </S.ActionBtn>
        </S.ActionRow>
      </S.ArtistSection>

      <S.SongsSection>
        <S.SectionHeader>
          <S.SectionTitle>Songs</S.SectionTitle>
          <S.SeeAll>See All</S.SeeAll>
        </S.SectionHeader>

        {isLoading ? (
          <ActivityIndicator size="large" color="#f97316" />
        ) : songs.length === 0 ? (
          <S.Stats>No songs found</S.Stats>
        ) : (
          songs.map((song) => (
            <SongListItem
              key={song.id}
              song={song}
              isPlaying={currentSong?.id === song.id && isPlaying}
              onPress={() => handlePlaySong(song)}
              onPlayPress={() => handlePlaySong(song)}
              onMenuPress={() => setContextSong(song)}
            />
          ))
        )}
      </S.SongsSection>

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

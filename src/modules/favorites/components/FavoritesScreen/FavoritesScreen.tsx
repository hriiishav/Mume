import React from 'react';
import { FlatList } from 'react-native';
import { useFavoritesStore } from '../../store/favoritesStore';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { SongListItem } from '../../../home/components/SongListItem';
import * as S from './styled';

export function FavoritesScreen() {
  const songs = useFavoritesStore((s) => s.songs);
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const addAndPlay = useQueueStore((s) => s.addAndPlay);

  const handlePlaySong = (song: any) => {
    addAndPlay(song);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Favorites</S.HeaderTitle>
      </S.Header>
      <S.Content $hasSongs={songs.length > 0}>
        {songs.length === 0 ? (
          <S.Subtitle>Your favorite songs will appear here</S.Subtitle>
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
                onMenuPress={() => { }}
              />
            )}
            style={{ width: '100%' }}
          />
        )}
      </S.Content>
    </S.Container>
  );
}

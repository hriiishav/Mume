import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQueueStore } from '../../store/queueStore';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useRecentlyPlayedStore } from '../../../home/store/recentlyPlayedStore';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import type { Song } from '../../../../core/types';
import * as S from './styled';

function QueueItem({
  song,
  index,
  isCurrent,
  onPress,
  onRemove,
}: {
  song: Song;
  index: number;
  isCurrent: boolean;
  onPress: () => void;
  onRemove: () => void;
}) {
  const imageUrl = getSongImageUrl(song.image);

  return (
    <S.Item $active={isCurrent} onPress={onPress} activeOpacity={0.7}>
      <S.ItemArtwork source={{ uri: imageUrl }} />
      <S.ItemInfo>
        <S.ItemTitle numberOfLines={1}>{song.name}</S.ItemTitle>
        <S.ItemSubtitle numberOfLines={1}>
          {song.primaryArtists ?? song.album?.name ?? ''}
        </S.ItemSubtitle>
      </S.ItemInfo>
      <S.RemoveBtn onPress={onRemove}>
        <S.RemoveBtnText>×</S.RemoveBtnText>
      </S.RemoveBtn>
    </S.Item>
  );
}

export function QueueScreen() {
  const navigation = useNavigation();
  const queue = useQueueStore((s) => s.queue);
  const currentIndex = useQueueStore((s) => s.currentIndex);
  const removeFromQueue = useQueueStore((s) => s.removeFromQueue);
  const setCurrentIndex = useQueueStore((s) => s.setCurrentIndex);
  const clearQueue = useQueueStore((s) => s.clearQueue);

  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);

  const handlePlay = (index: number) => {
    const song = queue[index];
    setCurrentIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
    useRecentlyPlayedStore.getState().addSong(song);
  };

  if (queue.length === 0) {
    return (
      <S.Container>
        <S.Header>
          <S.BackBtn onPress={() => navigation.goBack()}>
            <S.BackIcon>←</S.BackIcon>
          </S.BackBtn>
          <S.HeaderTitle>Queue</S.HeaderTitle>
          <S.HeaderSpacer />
        </S.Header>
        <S.Empty>
          <S.EmptyText>Queue is empty</S.EmptyText>
          <S.EmptyHint>Add songs from home to build your queue</S.EmptyHint>
        </S.Empty>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackBtn onPress={() => navigation.goBack()}>
          <S.BackIcon>←</S.BackIcon>
        </S.BackBtn>
        <S.HeaderTitle>Queue ({queue.length})</S.HeaderTitle>
        <TouchableOpacity onPress={clearQueue}>
          <S.ClearBtn>Clear</S.ClearBtn>
        </TouchableOpacity>
      </S.Header>
      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <QueueItem
            song={item}
            index={index}
            isCurrent={index === currentIndex}
            onPress={() => handlePlay(index)}
            onRemove={() => removeFromQueue(index)}
          />
        )}
      />
    </S.Container>
  );
}

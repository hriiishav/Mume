import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { Song } from '../../../../core/types';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import * as S from './styled';

type SongListItemProps = {
  song: Song;
  isPlaying?: boolean;
  onPress: () => void;
  onPlayPress: () => void;
  onMenuPress: () => void;
};

export function SongListItem({
  song,
  isPlaying = false,
  onPress,
  onPlayPress,
  onMenuPress,
}: SongListItemProps) {
  const imageUrl = getSongImageUrl(song.image);
  const duration =
    typeof song.duration === 'string'
      ? parseInt(song.duration, 10)
      : song.duration;
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;

  return (
    <S.Container onPress={onPress} activeOpacity={0.7}>
      <S.Artwork source={{ uri: imageUrl }} />
      <S.Info>
        <S.Title numberOfLines={1}>{song.name}</S.Title>
        <S.Subtitle numberOfLines={1}>
          {song.primaryArtists ??
            song.artists?.primary?.map((a) => a.name).join(', ') ??
            song.album?.name ??
            ''}
        </S.Subtitle>
      </S.Info>
      <S.Duration>
        {mins}:{secs.toString().padStart(2, '0')} mins
      </S.Duration>
      <S.PlayBtn
        onPress={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          onPlayPress();
        }}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={20}
          color="#fff"
        />
      </S.PlayBtn>
      <S.MenuBtn
        onPress={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          onMenuPress();
        }}
      >
        <Ionicons
          name="ellipsis-vertical"
          size={20}
          color="#6b7280"
        />
      </S.MenuBtn>
    </S.Container>
  );
}

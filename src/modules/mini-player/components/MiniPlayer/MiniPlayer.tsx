import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useAudioPlayer } from '../../../player/hooks/useAudioPlayer';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import * as S from './styled';

export function MiniPlayer() {
  const navigation = useNavigation();
  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const { playNext, playPrev } = useAudioPlayer();

  if (!currentSong) return null;

  const imageUrl = getSongImageUrl(currentSong.image);
  const artist =
    currentSong.primaryArtists ??
    currentSong.artists?.primary?.map((a) => a.name).join(', ') ??
    currentSong.album?.name ??
    '';

  return (
    <S.Container onPress={() => navigation.navigate('Player' as never)}>
      <S.Artwork source={{ uri: imageUrl }} />
      <S.Info>
        <S.Title numberOfLines={1}>{currentSong.name}</S.Title>
        <S.Subtitle numberOfLines={1}>{artist}</S.Subtitle>
      </S.Info>
      <S.Controls>
        <S.CtrlBtn
          onPress={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            (navigation as any).navigate('Queue');
          }}
        >
        </S.CtrlBtn>
        <S.CtrlBtn
          onPress={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            playPrev();
          }}
        >
          <S.CtrlText>⏮</S.CtrlText>
        </S.CtrlBtn>
        <S.PlayBtn
          onPress={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
        >
          <S.PlayBtnText>{isPlaying ? '⏸' : '▶'}</S.PlayBtnText>
        </S.PlayBtn>
        <S.CtrlBtn
          onPress={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            playNext();
          }}
        >
          <S.CtrlText>⏭</S.CtrlText>
        </S.CtrlBtn>
      </S.Controls>
    </S.Container>
  );
}

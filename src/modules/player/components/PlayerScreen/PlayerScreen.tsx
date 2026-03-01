import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePlayerStore } from '../../store/playerStore';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import { useFavoritesStore } from '../../../favorites/store/favoritesStore';
import { usePlaylistsStore } from '../../../playlists/store/playlistsStore';
import { AddToPlaylistModal } from '../../../playlists/components/AddToPlaylistModal/AddToPlaylistModal';
import * as S from './styled';

export function PlayerScreen() {
  const navigation = useNavigation();
  const [trackWidth, setTrackWidth] = useState(0);
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);

  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const position = usePlayerStore((s) => s.position);
  const duration = usePlayerStore((s) => s.duration);
  const shuffle = usePlayerStore((s) => s.shuffle);
  const repeat = usePlayerStore((s) => s.repeat);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const cycleRepeat = usePlayerStore((s) => s.cycleRepeat);

  const { playNext, playPrev, seek, seekBack10, seekForward10 } = useAudioPlayer();

  const isFavorite = useFavoritesStore((s) => s.isFavorite(currentSong?.id ?? ''));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handleSeek = useCallback(
    (e: { nativeEvent: { locationX: number } }) => {
      if (trackWidth <= 0) return;
      const pct = Math.max(0, Math.min(1, e.nativeEvent.locationX / trackWidth));
      seek(pct * (duration || 1));
    },
    [trackWidth, duration, seek]
  );

  if (!currentSong) {
    return (
      <S.Empty>
        <S.EmptyText>Select a song to play</S.EmptyText>
      </S.Empty>
    );
  }

  const imageUrl = getSongImageUrl(currentSong.image, '500x500');
  const artist =
    currentSong.primaryArtists ??
    currentSong.artists?.primary?.map((a) => a.name).join(', ') ??
    currentSong.album?.name ??
    '';

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = duration ? (position / duration) * 100 : 0;

  return (
    <S.Container>
      <S.HeaderRow>
        <S.BackBtn onPress={() => navigation.goBack()}>
          <S.BackIcon>←</S.BackIcon>
        </S.BackBtn>
        <S.QueueBtn onPress={() => (navigation as any).navigate('Queue')}>
          <Ionicons name="list" size={24} color="#1f2937" />
        </S.QueueBtn>
      </S.HeaderRow>

      <S.Artwork source={{ uri: imageUrl }} />
      <S.Title numberOfLines={1}>{currentSong.name}</S.Title>
      <S.Artist numberOfLines={1}>{artist}</S.Artist>

      <S.Progress>
        <S.SliderTrack
          onLayout={(e: { nativeEvent: { layout: { width: number } } }) => setTrackWidth(e.nativeEvent.layout.width)}
          onPress={handleSeek}
        >
          <S.SliderFill width={`${Math.min(100, progressPct)}%`} />
        </S.SliderTrack>
        <S.TimeRow>
          <S.Time>{formatTime(position)}</S.Time>
          <S.Time>{formatTime(duration)}</S.Time>
        </S.TimeRow>
      </S.Progress>

      <S.MainControls>
        <S.CtrlBtn onPress={playPrev}>
          <S.CtrlIcon>⏮</S.CtrlIcon>
        </S.CtrlBtn>
        <S.CtrlBtn onPress={seekBack10}>
          <S.CtrlIcon>⏪</S.CtrlIcon>
          <S.CtrlLabel>10</S.CtrlLabel>
        </S.CtrlBtn>
        <S.PlayBtn onPress={() => setIsPlaying(!isPlaying)}>
          <S.PlayBtnText>{isPlaying ? '⏸' : '▶'}</S.PlayBtnText>
        </S.PlayBtn>
        <S.CtrlBtn onPress={seekForward10}>
          <S.CtrlIcon>⏩</S.CtrlIcon>
          <S.CtrlLabel>10</S.CtrlLabel>
        </S.CtrlBtn>
        <S.CtrlBtn onPress={playNext}>
          <S.CtrlIcon>⏭</S.CtrlIcon>
        </S.CtrlBtn>
      </S.MainControls>

      <S.SecondaryControls>
        <S.SideBtn onPress={toggleShuffle}>
          <S.SideBtnText $active={shuffle}>Shuffle</S.SideBtnText>
        </S.SideBtn>
        <S.SideBtn onPress={() => currentSong && toggleFavorite(currentSong)}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#f97316' : '#6b7280'}
          />
        </S.SideBtn>
        <S.SideBtn onPress={() => setPlaylistModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#6b7280" />
        </S.SideBtn>
        <S.SideBtn onPress={cycleRepeat}>
          <S.SideBtnText $active={repeat !== 'off'}>
            {repeat === 'one' ? '1' : repeat === 'all' ? 'All' : 'Repeat'}
          </S.SideBtnText>
        </S.SideBtn>
      </S.SecondaryControls>

      <AddToPlaylistModal
        visible={playlistModalVisible}
        song={currentSong}
        onClose={() => setPlaylistModalVisible(false)}
      />
    </S.Container>
  );
}

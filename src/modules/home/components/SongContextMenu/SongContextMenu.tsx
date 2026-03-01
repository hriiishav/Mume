import React from 'react';
import { Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { Song } from '../../../../core/types';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import { useFavoritesStore } from '../../../favorites/store/favoritesStore';
import * as S from './styled';

type SongContextMenuProps = {
  visible: boolean;
  song: Song | null;
  onClose: () => void;
  onPlayNext: (song: Song) => void;
  onAddToQueue: (song: Song) => void;
  onAddToPlaylist?: (song: Song) => void;
  onGoToAlbum?: (song: Song) => void;
  onGoToArtist?: (song: Song) => void;
};

export function SongContextMenu({
  visible,
  song,
  onClose,
  onPlayNext,
  onAddToQueue,
  onAddToPlaylist,
}: SongContextMenuProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(song?.id ?? ''));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  if (!song) return null;

  const imageUrl = getSongImageUrl(song.image);
  const artist =
    song.primaryArtists ??
    song.artists?.primary?.map((a) => a.name).join(', ') ??
    song.album?.name ??
    '';
  const duration =
    typeof song.duration === 'string'
      ? parseInt(song.duration, 10)
      : song.duration;
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  const durationStr = `${mins}:${secs.toString().padStart(2, '0')} mins`;

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <S.Overlay>
        <S.Backdrop onPress={onClose} />
        <S.Sheet>
          <S.Handle>
            <S.HandleBar />
          </S.Handle>
          <S.SongInfo>
            <S.Artwork source={{ uri: imageUrl }} />
            <S.SongDetails>
              <S.Title numberOfLines={1}>{song.name}</S.Title>
              <S.Subtitle numberOfLines={1}>{artist}</S.Subtitle>
            </S.SongDetails>
            <S.Duration>{durationStr}</S.Duration>
          </S.SongInfo>

          <S.MenuItem
            onPress={() => handleAction(() => toggleFavorite(song))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={22}
                color={isFavorite ? '#f97316' : '#1f2937'}
              />
            </S.MenuIcon>
            <S.MenuText>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</S.MenuText>
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleAction(() => onPlayNext(song))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="play-skip-forward-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Play Next</S.MenuText>
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleAction(() => onAddToQueue(song))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="list-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Add to Playing Queue</S.MenuText>
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleAction(() => onAddToPlaylist?.(song))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="add-circle-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Add to Playlist</S.MenuText>
          </S.MenuItem>

          <S.MenuItem onPress={onClose} activeOpacity={0.7}>
            <S.MenuIcon>
              <Ionicons name="disc-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Go to Album</S.MenuText>
          </S.MenuItem>

          <S.MenuItem onPress={onClose} activeOpacity={0.7}>
            <S.MenuIcon>
              <Ionicons name="person-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Go to Artist</S.MenuText>
          </S.MenuItem>

          <S.MenuItem onPress={onClose} activeOpacity={0.7}>
            <S.MenuIcon>
              <Ionicons name="information-circle-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Details</S.MenuText>
          </S.MenuItem>

          <S.MenuItem onPress={onClose} activeOpacity={0.7}>
            <S.MenuIcon>
              <Ionicons name="share-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Share</S.MenuText>
          </S.MenuItem>
        </S.Sheet>
      </S.Overlay>
    </Modal>
  );
}

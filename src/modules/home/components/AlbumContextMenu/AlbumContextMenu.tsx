import React from 'react';
import { Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { Album } from '../../../../core/types';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import * as S from './styled';

function getAlbumImageUrl(album: Album): string {
  return album.image ? getSongImageUrl(album.image) : '';
}

type AlbumContextMenuProps = {
  visible: boolean;
  album: Album | null;
  onClose: () => void;
  onPlay: (album: Album) => void;
  onPlayNext: (album: Album) => void;
  onAddToQueue: (album: Album) => void;
  onGoToAlbum?: (album: Album) => void;
};

export function AlbumContextMenu({
  visible,
  album,
  onClose,
  onPlay,
  onPlayNext,
  onAddToQueue,
}: AlbumContextMenuProps) {
  if (!album) return null;

  const imageUrl = getAlbumImageUrl(album);
  const artist =
    album.primaryArtists ??
    album.artists?.primary?.map((a) => a.name).join(', ') ??
    '';
  const subtitle = [artist, album.year].filter(Boolean).join(' | ') || 'Tap to view songs';

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
      <S.Overlay onPress={onClose}>
        <S.Sheet onStartShouldSetResponder={() => true}>
          <S.Handle>
            <S.HandleBar />
          </S.Handle>
          <S.AlbumInfo>
            <S.Artwork source={{ uri: imageUrl }} />
            <S.AlbumDetails>
              <S.Title numberOfLines={1}>{album.name}</S.Title>
              <S.Subtitle numberOfLines={1}>{subtitle}</S.Subtitle>
            </S.AlbumDetails>
          </S.AlbumInfo>

          <S.MenuItem
            onPress={() => handleAction(() => onPlay(album))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="play" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Play</S.MenuText>
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleAction(() => onPlayNext(album))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="play-skip-forward-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Play Next</S.MenuText>
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleAction(() => onAddToQueue(album))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="list-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Add to Playing Queue</S.MenuText>
          </S.MenuItem>

          <S.MenuItem onPress={onClose} activeOpacity={0.7}>
            <S.MenuIcon>
              <Ionicons name="add-circle-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Add to Playlist</S.MenuText>
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

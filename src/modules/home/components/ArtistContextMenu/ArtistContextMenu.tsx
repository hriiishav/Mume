import React from 'react';
import { Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { Artist } from '../../../../core/types';
import * as S from './styled';

function getArtistImageUrl(artist: Artist): string {
  const img = artist.image?.[0];
  return img?.url ?? img?.link ?? '';
}

type ArtistContextMenuProps = {
  visible: boolean;
  artist: Artist | null;
  onClose: () => void;
  onPlay: (artist: Artist) => void;
  onPlayNext: (artist: Artist) => void;
  onAddToQueue: (artist: Artist) => void;
  onGoToArtist?: (artist: Artist) => void;
};

export function ArtistContextMenu({
  visible,
  artist,
  onClose,
  onPlay,
  onPlayNext,
  onAddToQueue,
  onGoToArtist,
}: ArtistContextMenuProps) {
  if (!artist) return null;

  const imageUrl = getArtistImageUrl(artist);

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
          <S.ArtistInfo>
            <S.Artwork source={{ uri: imageUrl }} />
            <S.ArtistDetails>
              <S.Title numberOfLines={1}>{artist.name}</S.Title>
              <S.Subtitle>Tap to view songs</S.Subtitle>
            </S.ArtistDetails>
          </S.ArtistInfo>

          <S.MenuItem
            onPress={() => handleAction(() => onPlay(artist))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="play" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Play</S.MenuText>
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleAction(() => onPlayNext(artist))}
            activeOpacity={0.7}
          >
            <S.MenuIcon>
              <Ionicons name="play-skip-forward-outline" size={22} color="#1f2937" />
            </S.MenuIcon>
            <S.MenuText>Play Next</S.MenuText>
          </S.MenuItem>

          <S.MenuItem
            onPress={() => handleAction(() => onAddToQueue(artist))}
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

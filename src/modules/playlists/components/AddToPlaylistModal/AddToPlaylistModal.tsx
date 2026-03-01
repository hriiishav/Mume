import React, { useState } from 'react';
import { Modal, FlatList, TextInput, View, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePlaylistsStore, type Playlist } from '../../store/playlistsStore';
import type { Song } from '../../../../core/types';
import styled from 'styled-components/native';

const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Sheet = styled.View`
  background-color: ${(props: any) => props.theme.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  max-height: 80%;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
`;

const CloseBtn = styled.TouchableOpacity`
  padding: 4px;
`;

const CreateRow = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  gap: 10px;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 44px;
  border-width: 1px;
  border-color: ${(props: any) => props.theme.border};
  border-radius: 8px;
  padding: 0 12px;
  color: ${(props: any) => props.theme.text};
  background-color: ${(props: any) => props.theme.input};
`;

const CreateBtn = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.primary};
  padding: 0 16px;
  border-radius: 8px;
  justify-content: center;
`;

const CreateBtnText = styled.Text`
  color: #fff;
  font-weight: 600;
`;

const PlaylistItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
`;

const PlaylistInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const PlaylistName = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.text};
  font-weight: 500;
`;

const SongCount = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 2px;
`;

type AddToPlaylistModalProps = {
  visible: boolean;
  song: Song | null;
  onClose: () => void;
};

export function AddToPlaylistModal({ visible, song, onClose }: AddToPlaylistModalProps) {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const playlists = usePlaylistsStore((s) => s.playlists);
  const createPlaylist = usePlaylistsStore((s) => s.createPlaylist);
  const addSongToPlaylist = usePlaylistsStore((s) => s.addSongToPlaylist);

  const handleCreate = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName.trim());
    setNewPlaylistName('');
  };

  const handleAddToPlaylist = (playlist: Playlist) => {
    if (!song) return;
    addSongToPlaylist(playlist.id, song);
    Alert.alert('Success', `Added to ${playlist.name}`);
    onClose();
  };

  if (!song) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Overlay>
        <Backdrop onPress={onClose} />
        <Sheet>
          <Header>
            <Title>Add to Playlist</Title>
            <CloseBtn onPress={onClose}>
              <Ionicons name="close" size={24} color="#f97316" />
            </CloseBtn>
          </Header>

          <CreateRow>
            <Input
              placeholder="New Playlist Name"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              placeholderTextColor="#9ca3af"
            />
            <CreateBtn onPress={handleCreate}>
              <CreateBtnText>Create</CreateBtnText>
            </CreateBtn>
          </CreateRow>

          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlaylistItem onPress={() => handleAddToPlaylist(item)}>
                <Ionicons name="musical-notes" size={24} color="#f97316" />
                <PlaylistInfo>
                  <PlaylistName>{item.name}</PlaylistName>
                  <SongCount>{item.songs.length} songs</SongCount>
                </PlaylistInfo>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </PlaylistItem>
            )}
            ListEmptyComponent={
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Title style={{ fontSize: 14, color: '#9ca3af' }}>No playlists yet</Title>
              </View>
            }
          />
        </Sheet>
      </Overlay>
    </Modal>
  );
}

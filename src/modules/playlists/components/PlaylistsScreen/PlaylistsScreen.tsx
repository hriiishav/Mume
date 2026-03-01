import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Alert, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePlaylistsStore, type Playlist } from '../../store/playlistsStore';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { SongListItem } from '../../../home/components/SongListItem';
import * as S from './styled';

export function PlaylistsScreen() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const playlists = usePlaylistsStore((s) => s.playlists);
  const deletePlaylist = usePlaylistsStore((s) => s.deletePlaylist);
  const removeSongFromPlaylist = usePlaylistsStore((s) => s.removeSongFromPlaylist);

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

  const handleDeletePlaylist = (id: string, name: string) => {
    Alert.alert('Delete Playlist', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deletePlaylist(id),
      },
    ]);
  };

  if (selectedPlaylist) {
    const playlist = playlists.find((p) => p.id === selectedPlaylist.id);
    if (!playlist) {
      setSelectedPlaylist(null);
      return null;
    }

    return (
      <S.Container>
        <S.Header>
          <TouchableOpacity onPress={() => setSelectedPlaylist(null)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
            <S.HeaderTitle style={{ marginLeft: 8 }}>{playlist.name}</S.HeaderTitle>
          </TouchableOpacity>
        </S.Header>
        <S.Content $hasContent={playlist.songs.length > 0}>
          {playlist.songs.length === 0 ? (
            <S.Subtitle>This playlist is empty</S.Subtitle>
          ) : (
            <FlatList
              data={playlist.songs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <SongListItem
                      song={item}
                      isPlaying={currentSong?.id === item.id && isPlaying}
                      onPress={() => handlePlaySong(item)}
                      onPlayPress={() => handlePlaySong(item)}
                      onMenuPress={() => { }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => removeSongFromPlaylist(playlist.id, item.id)}
                    style={{ padding: 16 }}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              )}
              style={{ width: '100%' }}
            />
          )}
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Playlists</S.HeaderTitle>
      </S.Header>
      <S.Content $hasContent={playlists.length > 0}>
        {playlists.length === 0 ? (
          <S.Subtitle>Your playlists will appear here</S.Subtitle>
        ) : (
          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedPlaylist(item)}
                onLongPress={() => handleDeletePlaylist(item.id, item.name)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f3f4f6',
                }}
              >
                <Ionicons name="musical-notes" size={32} color="#f97316" />
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>{item.name}</Text>
                  <Text style={{ fontSize: 14, color: '#6b7280' }}>{item.songs.length} songs</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
            style={{ width: '100%' }}
          />
        )}
      </S.Content>
    </S.Container>
  );
}

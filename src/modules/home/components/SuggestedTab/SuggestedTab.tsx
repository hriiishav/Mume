import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useRecentlyPlayedStore } from '../../store/recentlyPlayedStore';
import { useSuggestedSongs, useSuggestedArtists } from '../../hooks/useSuggestedContent';
import { usePlayerStore } from '../../../player/store/playerStore';
import { useQueueStore } from '../../../queue/store/queueStore';
import { getSongImageUrl } from '../../../../core/utils/imageUtils';
import type { Song } from '../../../../core/types';
import type { Artist } from '../../../../core/types';
import * as S from './styled';

type SectionProps = {
  title: string;
  onSeeAll?: () => void;
  children: React.ReactNode;
};

function Section({ title, onSeeAll, children }: SectionProps) {
  return (
    <S.Section>
      <S.SectionHeader>
        <S.SectionTitle>{title}</S.SectionTitle>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <S.SeeAll>See All</S.SeeAll>
          </TouchableOpacity>
        )}
      </S.SectionHeader>
      {children}
    </S.Section>
  );
}

type SongCardProps = {
  song: Song;
  onPress: () => void;
};

function SongCard({ song, onPress }: SongCardProps) {
  const imageUrl = getSongImageUrl(song.image, '500x500');
  const artist =
    song.primaryArtists ??
    song.artists?.primary?.map((a) => a.name).join(', ') ??
    song.album?.name ??
    '';

  return (
    <S.SongCard onPress={onPress}>
      <S.SongArtwork source={{ uri: imageUrl }} />
      <S.SongTitle numberOfLines={1}>{song.name}</S.SongTitle>
      <S.SongArtist numberOfLines={1}>{artist}</S.SongArtist>
    </S.SongCard>
  );
}

type ArtistCardProps = {
  artist: Artist;
  onPress: () => void;
};

function ArtistCard({ artist, onPress }: ArtistCardProps) {
  const imageUrl = artist.image?.[0]?.url ?? artist.image?.[0]?.link ?? '';

  return (
    <S.ArtistCard onPress={onPress}>
      <S.ArtistImage source={{ uri: imageUrl }} />
      <S.ArtistName numberOfLines={1}>{artist.name}</S.ArtistName>
    </S.ArtistCard>
  );
}

export function SuggestedTab() {
  const theme: any = useTheme();
  const recentlyPlayed = useRecentlyPlayedStore((s) => s.songs);
  const loadRecentlyPlayed = useRecentlyPlayedStore((s) => s.loadFromStorage);

  const { data: songsData, isLoading: songsLoading } = useSuggestedSongs();
  const { data: artistsData, isLoading: artistsLoading } = useSuggestedArtists();

  const addAndPlay = useQueueStore((s) => s.addAndPlay);
  const setCurrentSong = usePlayerStore((s) => s.setCurrentSong);
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);
  const addSong = useRecentlyPlayedStore((s) => s.addSong);

  const suggestedSongs: Song[] = songsData?.data?.results ?? [];
  const suggestedArtists: Artist[] = artistsData?.data?.results ?? [];

  useEffect(() => {
    loadRecentlyPlayed();
  }, [loadRecentlyPlayed]);

  const handlePlaySong = (song: Song) => {
    addAndPlay(song);
    setCurrentSong(song);
    setIsPlaying(true);
    addSong(song);
  };

  return (
    <S.Container showsVerticalScrollIndicator={false}>
      <Section title="Recently Played" onSeeAll={undefined}>
        {recentlyPlayed.length === 0 ? (
          <S.EmptyText>Play some songs to see them here</S.EmptyText>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -16 }}
          >
            {recentlyPlayed.slice(0, 6).map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPress={() => handlePlaySong(song)}
              />
            ))}
          </ScrollView>
        )}
      </Section>

      <Section title="Artists">
        {artistsLoading ? (
          <ActivityIndicator size="small" color={theme.primary} />
        ) : suggestedArtists.length === 0 ? (
          <S.EmptyText>No artists to show</S.EmptyText>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -16 }}
          >
            {suggestedArtists.slice(0, 6).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onPress={() => { }} />
            ))}
          </ScrollView>
        )}
      </Section>

      <Section title="Most Played">
        {songsLoading ? (
          <ActivityIndicator size="small" color={theme.primary} />
        ) : suggestedSongs.length === 0 ? (
          <S.EmptyText>No songs to show</S.EmptyText>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -16 }}
          >
            {suggestedSongs.slice(0, 6).map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPress={() => handlePlaySong(song)}
              />
            ))}
          </ScrollView>
        )}
      </Section>
    </S.Container>
  );
}

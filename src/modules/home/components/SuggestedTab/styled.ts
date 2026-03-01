import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
`;

export const Section = styled.View`
  margin-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
`;

export const SeeAll = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.primary};
  font-weight: 600;
`;

export const HorizontalScroll = styled.ScrollView`
  margin-left: -16px;
  margin-right: -16px;
`;

export const SongCard = styled.TouchableOpacity`
  width: 140px;
  margin-right: 16px;
`;

export const SongArtwork = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 8px;
`;

export const SongTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props: any) => props.theme.text};
  margin-top: 8px;
`;

export const SongArtist = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 2px;
`;

export const ArtistCard = styled.TouchableOpacity`
  width: 100px;
  margin-right: 16px;
  align-items: center;
`;

export const ArtistImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const ArtistName = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: ${(props: any) => props.theme.text};
  margin-top: 8px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.textMuted};
`;

export const Loader = styled.View`
  padding: 16px;
`;

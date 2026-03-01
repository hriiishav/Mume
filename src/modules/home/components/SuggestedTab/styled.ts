import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
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
  color: #1f2937;
`;

export const SeeAll = styled.Text`
  font-size: 14px;
  color: #f97316;
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
  color: #1f2937;
  margin-top: 8px;
`;

export const SongArtist = styled.Text`
  font-size: 12px;
  color: #6b7280;
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
  color: #1f2937;
  margin-top: 8px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: #9ca3af;
`;

export const Loader = styled.View`
  padding: 16px;
`;

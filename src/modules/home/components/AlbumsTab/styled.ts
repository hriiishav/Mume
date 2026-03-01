import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Placeholder = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PlaceholderText = styled.Text`
  font-size: 16px;
  color: #9ca3af;
`;

export const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

export const AlbumCount = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
`;

export const SortBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const SortLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #f97316;
`;

export const AlbumCard = styled.View`
  width: 48%;
  align-self: flex-start;
`;

export const AlbumCardTouchable = styled.TouchableOpacity``;

export const AlbumArtwork = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
`;

export const AlbumInfo = styled.View`
  margin-top: 8px;
`;

export const AlbumTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AlbumTitle = styled.Text`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

export const MenuBtn = styled.TouchableOpacity`
  padding: 4px;
  margin-left: 4px;
`;

export const AlbumArtist = styled.Text`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

export const AlbumSongCount = styled.Text`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

export const SortModalOverlay = styled.Pressable`
  flex: 1;
  background-color: transparent;
`;

export const SortOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
`;

export const SortOptionText = styled.Text`
  font-size: 16px;
  color: #1f2937;
  margin-left: 12px;
`;

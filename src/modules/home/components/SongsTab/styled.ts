import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const SearchRow = styled.View`
  flex-direction: row;
  padding: 16px;
  gap: 8px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: #f9fafb;
  border-radius: 12px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 16px;
  color: #1f2937;
  border-width: 1px;
  border-color: #e5e7eb;
`;

export const SearchBtn = styled.TouchableOpacity`
  background-color: #f97316;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 12px;
  justify-content: center;
`;

export const SearchBtnText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

export const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

export const SongCount = styled.Text`
  font-size: 14px;
  font-weight: 600;
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

export const SortMenu = styled.View`
  flex-direction: row;
  padding: 16px;
  gap: 8px;
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

export const SortModalOverlay = styled.Pressable`
  flex: 1;
  background-color: transparent;
`;

export const SortModalContent = styled.View`
  padding: 12px;
  background-color: #fff;
  border-radius: 12px;
  margin: 8px 16px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
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

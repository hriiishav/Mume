import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
`;

export const SearchRow = styled.View`
  flex-direction: row;
  padding: 16px;
  gap: 8px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: ${(props: any) => props.theme.input};
  border-radius: 12px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 16px;
  color: ${(props: any) => props.theme.text};
  border-width: 1px;
  border-color: ${(props: any) => props.theme.border};
`;

export const SearchBtn = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.primary};
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
  border-bottom-color: ${(props: any) => props.theme.border};
`;

export const SongCount = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props: any) => props.theme.text};
`;

export const SortBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const SortLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props: any) => props.theme.primary};
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
  color: ${(props: any) => props.theme.textMuted};
`;

export const SortModalOverlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const SortModalContent = styled.View`
  padding: 12px;
  background-color: ${(props: any) => props.theme.card};
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
  color: ${(props: any) => props.theme.text};
  margin-left: 12px;
`;

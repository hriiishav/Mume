import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 48px;
  padding-bottom: 12px;
  gap: 8px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

export const BackBtn = styled.TouchableOpacity`
  padding: 8px;
`;

export const BackIcon = styled.Text`
  font-size: 24px;
  color: #1f2937;
`;

export const SearchRow = styled.View`
  flex: 1;
  flex-direction: row;
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

export const Placeholder = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PlaceholderText = styled.Text`
  font-size: 16px;
  color: #9ca3af;
`;

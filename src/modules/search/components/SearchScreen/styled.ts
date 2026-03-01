import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 48px;
  padding-bottom: 12px;
  gap: 8px;
  background-color: ${(props: any) => props.theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
`;

export const BackBtn = styled.TouchableOpacity`
  padding: 8px;
`;

export const BackIcon = styled.Text`
  font-size: 24px;
  color: ${(props: any) => props.theme.text};
`;

export const SearchRow = styled.View`
  flex: 1;
  flex-direction: row;
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

export const Placeholder = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PlaceholderText = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.textMuted};
`;

import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 48px;
  padding-bottom: 12px;
  background-color: ${(props: any) => props.theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
`;

export const Brand = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
`;

export const SearchBtn = styled.TouchableOpacity`
  padding: 8px;
`;

import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 48px;
  padding-bottom: 12px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

export const Brand = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Logo = styled.Text`
  font-size: 24px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #1f2937;
`;

export const SearchBtn = styled.TouchableOpacity`
  padding: 8px;
`;

export const SearchIcon = styled.Text`
  font-size: 22px;
`;

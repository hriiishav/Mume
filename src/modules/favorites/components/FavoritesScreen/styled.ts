import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
`;

export const Header = styled.View`
  padding: 16px;
  padding-top: 48px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
`;

export const Content = styled.View<{ $hasSongs?: boolean }>`
  flex: 1;
  justify-content: ${(props: { $hasSongs?: boolean }) => (props.$hasSongs ? 'flex-start' : 'center')};
  align-items: ${(props: { $hasSongs?: boolean }) => (props.$hasSongs ? 'stretch' : 'center')};
  padding: ${(props: { $hasSongs?: boolean }) => (props.$hasSongs ? '0' : '24px')};
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.textMuted};
  text-align: center;
`;

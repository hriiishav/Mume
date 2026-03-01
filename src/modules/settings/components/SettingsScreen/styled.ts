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

export const Content = styled.View`
  flex: 1;
  padding: 24px;
`;

export const Section = styled.View`
  margin-top: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props: any) => props.theme.primary};
  text-transform: uppercase;
  margin-bottom: 12px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${(props: any) => props.theme.surface};
  border-radius: 12px;
`;

export const RowText = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.text};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 4px;
`;

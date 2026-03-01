import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${(props: any) => props.theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
`;

export const ScrollContent = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  gap: 24px;
`;

export const Tab = styled.TouchableOpacity`
  margin-right: 24px;
`;

export const TabLabel = styled.Text<{ $active?: boolean }>`
  font-size: 16px;
  color: ${(props: any) => (props.$active ? props.theme.primary : props.theme.textMuted)};
  font-weight: ${(props: { $active?: boolean }) => (props.$active ? '600' : '500')};
`;

export const Underline = styled.View`
  position: absolute;
  bottom: -12px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: ${(props: any) => props.theme.primary};
  border-radius: 2px;
`;

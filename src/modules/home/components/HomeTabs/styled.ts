import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
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
  color: ${(props: { $active?: boolean }) => (props.$active ? '#f97316' : '#6b7280')};
  font-weight: ${(props: { $active?: boolean }) => (props.$active ? '600' : '500')};
`;

export const Underline = styled.View`
  position: absolute;
  bottom: -12px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #f97316;
  border-radius: 2px;
`;

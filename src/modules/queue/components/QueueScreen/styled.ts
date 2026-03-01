import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 48px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
`;

export const BackBtn = styled.TouchableOpacity`
  padding: 8px;
  min-width: 40px;
`;

export const BackIcon = styled.Text`
  font-size: 24px;
  color: ${(props: any) => props.theme.text};
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
  text-align: center;
`;

export const HeaderSpacer = styled.View`
  padding: 8px;
  min-width: 40px;
`;

export const ClearBtn = styled.Text`
  font-size: 14px;
  color: #ef4444;
`;

export const Empty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.background};
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  color: ${(props: any) => props.theme.text};
`;

export const EmptyHint = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 8px;
`;

export const Item = styled.TouchableOpacity<{ $active?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: ${(props: any) => props.theme.surface};
  border-radius: 12px;
  border-width: ${(props: { $active?: boolean }) => (props.$active ? 2 : 1)}px;
  border-color: ${(props: any) => (props.$active ? props.theme.primary : props.theme.border)};
`;

export const ItemArtwork = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 6px;
`;

export const ItemInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: any) => props.theme.text};
`;

export const ItemSubtitle = styled.Text`
  font-size: 13px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 2px;
`;

export const RemoveBtn = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props: any) => props.theme.border};
  align-items: center;
  justify-content: center;
`;

export const RemoveBtnText = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.textMuted};
`;

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 48px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

export const BackBtn = styled.TouchableOpacity`
  padding: 8px;
  min-width: 40px;
`;

export const BackIcon = styled.Text`
  font-size: 24px;
  color: #1f2937;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
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
  background-color: #fff;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  color: #6b7280;
`;

export const EmptyHint = styled.Text`
  font-size: 14px;
  color: #9ca3af;
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
  background-color: #f9fafb;
  border-radius: 12px;
  border-width: ${(props: { $active?: boolean }) => (props.$active ? 2 : 1)}px;
  border-color: ${(props: { $active?: boolean }) => (props.$active ? '#f97316' : '#f3f4f6')};
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
  color: #1f2937;
`;

export const ItemSubtitle = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
`;

export const RemoveBtn = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #e5e7eb;
  align-items: center;
  justify-content: center;
`;

export const RemoveBtnText = styled.Text`
  font-size: 20px;
  color: #6b7280;
`;

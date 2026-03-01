import styled from 'styled-components/native';

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-end;
`;

export const Sheet = styled.View`
  background-color: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding-bottom: 32px;
`;

export const Handle = styled.View`
  align-items: center;
  padding-top: 12px;
  padding-bottom: 8px;
`;

export const HandleBar = styled.View`
  width: 36px;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
`;

export const SongInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

export const Artwork = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

export const SongDetails = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #6b7280;
  margin-top: 2px;
`;

export const Duration = styled.Text`
  font-size: 13px;
  color: #6b7280;
  margin-left: 8px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 14px 20px;
`;

export const MenuIcon = styled.View`
  width: 24px;
  align-items: center;
`;

export const MenuText = styled.Text`
  font-size: 16px;
  color: #1f2937;
  margin-left: 16px;
`;

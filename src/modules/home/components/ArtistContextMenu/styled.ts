import styled from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Sheet = styled.View`
  background-color: ${(props: any) => props.theme.background};
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
  background-color: ${(props: any) => props.theme.border};
  border-radius: 2px;
`;

export const ArtistInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
`;

export const Artwork = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ArtistDetails = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: any) => props.theme.text};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 2px;
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
  color: ${(props: any) => props.theme.text};
  margin-left: 16px;
`;

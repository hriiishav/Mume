import styled from 'styled-components/native';

export const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${(props: any) => props.theme.background};
  border-top-width: 1px;
  border-top-color: ${(props: any) => props.theme.border};
`;

export const Artwork = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 6px;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props: any) => props.theme.text};
`;

export const Subtitle = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 2px;
`;

export const Controls = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CtrlBtn = styled.TouchableOpacity`
  padding: 4px;
`;

export const CtrlText = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.text};
`;

export const PlayBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: any) => props.theme.primary};
  align-items: center;
  justify-content: center;
`;

export const PlayBtnText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

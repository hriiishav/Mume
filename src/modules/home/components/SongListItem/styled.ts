import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: ${(props: any) => props.theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${(props: any) => props.theme.border};
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
  font-size: 16px;
  font-weight: 600;
  color: ${(props: any) => props.theme.text};
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 2px;
`;

export const Duration = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.textMuted};
  margin-right: 12px;
  min-width: 50px;
  text-align: right;
`;

export const PlayBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: any) => props.theme.primary};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const MenuBtn = styled.TouchableOpacity`
  padding: 8px;
`;


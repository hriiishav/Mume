import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.background};
  align-items: center;
  padding: 24px;
  justify-content: space-around;
`;

export const Empty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.background};
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.textMuted};
`;

export const HeaderRow = styled.View`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding-left: 16px;
  padding-right: 16px;
`;

export const BackBtn = styled.TouchableOpacity`
  padding: 8px;
`;

export const QueueBtn = styled.TouchableOpacity`
  padding: 8px;
`;

export const BackIcon = styled.Text`
  font-size: 24px;
  color: ${(props: any) => props.theme.text};
`;

export const Artwork = styled.Image`
  width: ${width * 0.7}px;
  height: ${width * 0.7}px;
  max-width: 300px;
  max-height: 300px;
  border-radius: 12px;
  margin-top: 60px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
  margin-top: 24px;
`;

export const Artist = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 4px;
`;

export const Progress = styled.View`
  width: 100%;
  margin-top: 32px;
`;

export const SliderTrack = styled.Pressable`
  width: 100%;
  height: 6px;
  background-color: ${(props: any) => props.theme.border};
  border-radius: 3px;
  overflow: hidden;
`;

export const SliderFill = styled.View<{ width: string }>`
  height: 100%;
  width: ${(props: { width: string }) => props.width};
  background-color: ${(props: any) => props.theme.primary};
  border-radius: 3px;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const Time = styled.Text`
  font-size: 12px;
  color: ${(props: any) => props.theme.textMuted};
`;

export const MainControls = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  gap: 12px;
`;

export const CtrlBtn = styled.TouchableOpacity`
  align-items: center;
  padding: 8px;
`;

export const CtrlIcon = styled.Text`
  font-size: 24px;
  color: ${(props: any) => props.theme.text};
`;

export const CtrlLabel = styled.Text`
  font-size: 10px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 2px;
`;

export const PlayBtn = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${(props: any) => props.theme.primary};
  align-items: center;
  justify-content: center;
  margin-horizontal: 8px;
`;

export const PlayBtnText = styled.Text`
  font-size: 28px;
  color: #fff;
`;

export const SecondaryControls = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  gap: 32px;
`;

export const SideBtn = styled.TouchableOpacity`
  padding: 8px;
`;

export const SideBtnText = styled.Text<{ $active?: boolean }>`
  font-size: 14px;
  color: ${(props: any) => (props.$active ? props.theme.primary : props.theme.textMuted)};
  font-weight: ${(props: { $active?: boolean }) => (props.$active ? '600' : '400')};
`;

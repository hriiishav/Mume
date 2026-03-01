import styled from 'styled-components/native';

export const Container = styled.ScrollView`
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

export const BackIcon = styled.Text`
  font-size: 24px;
  color: ${(props: any) => props.theme.text};
`;

export const BackBtn = styled.TouchableOpacity`
  padding: 8px;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const ArtistSection = styled.View`
  align-items: center;
  padding: 24px;
`;

export const Artwork = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 12px;
`;

export const ArtistName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
  margin-top: 16px;
  text-align: center;
`;

export const Stats = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.textMuted};
  margin-top: 8px;
`;

export const ActionRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const ActionBtn = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px;
  border-radius: 12px;
  background-color: ${(props: any) => props.theme.primary};
  gap: 8px;
`;

export const ActionBtnText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

export const SongsSection = styled.View`
  padding: 16px;
  padding-top: 24px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props: any) => props.theme.text};
`;

export const SeeAll = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.primary};
  font-weight: 600;
`;

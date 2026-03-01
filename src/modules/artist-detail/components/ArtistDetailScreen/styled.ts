import styled from 'styled-components/native';

export const Container = styled.ScrollView`
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
  color: #1f2937;
  margin-top: 16px;
  text-align: center;
`;

export const Stats = styled.Text`
  font-size: 14px;
  color: #6b7280;
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
  background-color: #f97316;
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
  color: #1f2937;
`;

export const SeeAll = styled.Text`
  font-size: 14px;
  color: #f97316;
  font-weight: 600;
`;

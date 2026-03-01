import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '../HomeHeader';
import { HomeTabs, type HomeTab } from '../HomeTabs';
import { SuggestedTab } from '../SuggestedTab';
import { SongsTab } from '../SongsTab';
import { ArtistsTab } from '../ArtistsTab';
import { AlbumsTab } from '../AlbumsTab';
import * as S from './styled';

export function HomeScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<HomeTab>('suggested');

  const handleSearchPress = () => {
    navigation.navigate('Search' as never);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'suggested':
        return <SuggestedTab />;
      case 'songs':
        return <SongsTab />;
      case 'artists':
        return <ArtistsTab />;
      case 'albums':
        return <AlbumsTab />;
      default:
        return <SuggestedTab />;
    }
  };

  return (
    <S.Container>
      <HomeHeader onSearchPress={handleSearchPress} />
      <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <S.Content>{renderTabContent()}</S.Content>
    </S.Container>
  );
}

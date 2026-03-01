import React from 'react';
import { ScrollView } from 'react-native';
import * as S from './styled';

export type HomeTab = 'suggested' | 'songs' | 'artists' | 'albums';

type HomeTabsProps = {
  activeTab: HomeTab;
  onTabChange: (tab: HomeTab) => void;
};

const TABS: { key: HomeTab; label: string }[] = [
  { key: 'suggested', label: 'Suggested' },
  { key: 'songs', label: 'Songs' },
  { key: 'artists', label: 'Artists' },
  { key: 'albums', label: 'Albums' },
];

export function HomeTabs({ activeTab, onTabChange }: HomeTabsProps) {
  return (
    <S.Container>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 24,
        }}
      >
        {TABS.map((tab) => (
          <S.Tab key={tab.key} onPress={() => onTabChange(tab.key)}>
            <S.TabLabel $active={activeTab === tab.key}>{tab.label}</S.TabLabel>
            {activeTab === tab.key && <S.Underline />}
          </S.Tab>
        ))}
      </ScrollView>
    </S.Container>
  );
}

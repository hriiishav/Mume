import React from 'react';
import { Switch } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import * as S from './styled';

export function SettingsScreen() {
  const themeMode = useThemeStore((s) => s.themeMode);
  const setThemeMode = useThemeStore((s) => s.setThemeMode);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Settings</S.HeaderTitle>
      </S.Header>
      <S.Content>
        <S.Section>
          <S.SectionTitle>Appearance</S.SectionTitle>
          <S.Row>
            <S.RowText>Dark Mode</S.RowText>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#f97316' }}
              thumbColor={themeMode === 'dark' ? '#fff' : '#f4f3f4'}
            />
          </S.Row>
          <S.Subtitle>
            Switch between light and dark themes to your preference.
          </S.Subtitle>
        </S.Section>
      </S.Content>
    </S.Container>
  );
}

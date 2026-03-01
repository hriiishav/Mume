import React from 'react';
import * as S from './styled';

export function SettingsScreen() {
  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Settings</S.HeaderTitle>
      </S.Header>
      <S.Content>
        <S.Subtitle>App settings will appear here</S.Subtitle>
      </S.Content>
    </S.Container>
  );
}

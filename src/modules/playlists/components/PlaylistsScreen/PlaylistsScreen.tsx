import React from 'react';
import * as S from './styled';

export function PlaylistsScreen() {
  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Playlists</S.HeaderTitle>
      </S.Header>
      <S.Content>
        <S.Subtitle>Your playlists will appear here</S.Subtitle>
      </S.Content>
    </S.Container>
  );
}

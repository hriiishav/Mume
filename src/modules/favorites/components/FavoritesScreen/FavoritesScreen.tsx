import React from 'react';
import * as S from './styled';

export function FavoritesScreen() {
  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>Favorites</S.HeaderTitle>
      </S.Header>
      <S.Content>
        <S.Subtitle>Your favorite songs will appear here</S.Subtitle>
      </S.Content>
    </S.Container>
  );
}

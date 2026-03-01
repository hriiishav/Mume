import React from 'react';
import * as S from './styled';

type HomeHeaderProps = {
  onSearchPress: () => void;
};

export function HomeHeader({ onSearchPress }: HomeHeaderProps) {
  return (
    <S.Container>
      <S.Brand>
        <S.Logo>🎵</S.Logo>
        <S.Title>Mume</S.Title>
      </S.Brand>
      <S.SearchBtn onPress={onSearchPress}>
        <S.SearchIcon>🔍</S.SearchIcon>
      </S.SearchBtn>
    </S.Container>
  );
}

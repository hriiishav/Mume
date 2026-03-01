import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import * as S from './styled';

type HomeHeaderProps = {
  onSearchPress: () => void;
};

export function HomeHeader({ onSearchPress }: HomeHeaderProps) {
  const theme: any = useTheme();

  return (
    <S.Container>
      <S.Brand>
        <Ionicons name="musical-notes" size={28} color={theme.primary} />
        <S.Title>Mume</S.Title>
      </S.Brand>
      <S.SearchBtn onPress={onSearchPress}>
        <Ionicons name="search" size={24} color={theme.text} />
      </S.SearchBtn>
    </S.Container>
  );
}

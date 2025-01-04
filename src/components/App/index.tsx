import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { useGlobalThemeContext } from '../../context/theme';
import { TGlobalStyleProps } from '../../types/global';
import * as SC from './styles';

const GlobalStyle = createGlobalStyle<TGlobalStyleProps>`
* {
  scrollbar-color: ${({ thumbColor }) => thumbColor} ${({ trackColor }) => trackColor};
}
`;

const App: FC = () => {
  const { theme } = useGlobalThemeContext();

  return (
    <SC.StyledAppContainer $bgColor={theme.mainBackground}>
      <GlobalStyle thumbColor={theme.scrollBar.thumbColor} trackColor={theme.scrollBar.trackColor} />
      <Outlet />
    </SC.StyledAppContainer>
  );
};

export default App

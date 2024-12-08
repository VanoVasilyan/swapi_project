import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useGlobalThemeContext } from '../../context/theme';
import * as SC from './styles';

const App: FC = () => {
  const { theme } = useGlobalThemeContext();

  return (
    <SC.StyledAppContainer $bgColor={theme.mainBackground}>
      <Outlet />
    </SC.StyledAppContainer>
  );
};

export default App

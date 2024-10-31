import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import * as SC from './styles';

const App: FC = () => {
  return (
    <SC.StyledAppContainer>
      <Outlet />
    </SC.StyledAppContainer>
  );
};

export default App

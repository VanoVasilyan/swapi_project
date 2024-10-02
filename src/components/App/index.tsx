import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import * as SC from './styles';

const App: FC = () => {
  return (
    <SC.StyledAppContainer>
      <Header />
      <SC.StyledOutletMainBlock>
        <Outlet />
      </SC.StyledOutletMainBlock>
    </SC.StyledAppContainer>
  );
};

export default App

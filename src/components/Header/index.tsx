import React, { FC } from 'react';
import Search from '../SearchBar';
import Navbar from '../Navbar';
import * as SC from './styles';

const Header: FC = () => {
    return (
        <SC.StyledHeaderMainBlock>
            <Navbar />
            <SC.StyledSearchBlock>
                <Search />
            </SC.StyledSearchBlock>
        </SC.StyledHeaderMainBlock>
    )
};

export default Header

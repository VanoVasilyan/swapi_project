import React, { FC } from 'react';
import Search from '../SearchBar';
import Navbar from '../Navbar';
import { THeader } from './types';
import * as SC from './styles';

const Header: FC<THeader> = ({ delayDebounceSearch, searchvalue }) => {
    return (
        <SC.StyledHeaderMainBlock>
            <Navbar />
            <SC.StyledSearchBlock>
                <Search delayDebounceSearch={delayDebounceSearch} searchvalue={searchvalue} />
            </SC.StyledSearchBlock>
        </SC.StyledHeaderMainBlock>
    )
};

export default Header

import React, { FC } from 'react';
import Search from '../SearchBar';
import Navbar from '../Navbar';
import Button from '../Button';
import { useGlobalThemeContext } from '../../context/theme';
import { THeader } from './types';
import * as SC from './styles';

const Header: FC<THeader> = ({ delayDebounceSearch, searchvalue }) => {
    const { theme, isDark, toggleTheme } = useGlobalThemeContext();

    return (
        <SC.StyledHeaderMainBlock $isDark={isDark} $bgColor={theme.header.background}>
            <Navbar />
            <SC.StyledSearchBlock>
                <SC.StyledToggleThemeButtonWrapper>
                    <Button type='toggleTheme' onClick={toggleTheme} />
                </SC.StyledToggleThemeButtonWrapper>
                <Search delayDebounceSearch={delayDebounceSearch} searchvalue={searchvalue} />
            </SC.StyledSearchBlock>
        </SC.StyledHeaderMainBlock>
    )
};

export default Header

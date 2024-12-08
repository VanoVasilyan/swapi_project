import React, { FC, useMemo } from 'react';
import { useGlobalThemeContext } from '../../context/theme';
import Loading from '../Loading';
import { TButton } from './types';
import * as SC from './styles';

const Button: FC<TButton> = ({ type, onClick, isLoading, to, name, isActive }) => {
    const { theme, isDark } = useGlobalThemeContext();

    const memoizedButton = useMemo(() => {
        if (type === 'getMoreInfo') {
            return <SC.StyledGetMoreInfoButton
                $isDark={isDark}
                $borderColor={theme.card.button.borderColor}
                $color={theme.card.button.color}
                $bgColor={theme.card.button.bgColor}
                $isLoading={isLoading as boolean}
                onClick={onClick}
            >{isLoading ? <Loading $left='38px' $top='-8px' /> : 'Get More Info'}</SC.StyledGetMoreInfoButton>
        };

        return <SC.StyledNavLink
            to={to as string}
            $isDark={isDark}
            $color={theme.header.navBarLinks.color}
            $activeColor={theme.header.navBarLinks.active.color}
            $activeBackground={theme.header.navBarLinks.active.background}
            $bgColor={theme.header.navBarLinks.background}
            $borderColor={theme.header.navBarLinks.borderColor}
            $isActive={isActive as boolean}
        >
            {name}</SC.StyledNavLink>

    }, [isActive, isDark, isLoading, name, onClick, theme.card.button.bgColor, theme.card.button.borderColor, theme.card.button.color, theme.header.navBarLinks.active.background, theme.header.navBarLinks.active.color, theme.header.navBarLinks.background, theme.header.navBarLinks.borderColor, theme.header.navBarLinks.color, to, type])

    return memoizedButton
};

export default Button

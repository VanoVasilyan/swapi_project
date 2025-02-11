import React, { FC, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
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
            >{isLoading ? <Loading /> : 'Get More Info'}</SC.StyledGetMoreInfoButton>
        } else if (type === 'toggleTheme') {
            return <SC.StyledToggleThemeButton
                aria-label='switcher'
                $isDark={isDark}
                $bgColor={theme.header.toggleThemeButton.background}
                $color={theme.header.toggleThemeButton.color}
                onClick={onClick}
            >
                <FontAwesomeIcon icon={faLightbulb} />
            </SC.StyledToggleThemeButton>
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

    }, [isActive, isDark, isLoading, name, onClick, theme.card.button.bgColor, theme.card.button.borderColor, theme.card.button.color, theme.header.navBarLinks.active.background, theme.header.navBarLinks.active.color, theme.header.navBarLinks.background, theme.header.navBarLinks.borderColor, theme.header.navBarLinks.color, theme.header.toggleThemeButton.background, theme.header.toggleThemeButton.color, to, type])

    return memoizedButton
};

export default Button

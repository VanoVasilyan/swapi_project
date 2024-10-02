import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { navBarLinks } from '../../static_data/navbarLinks';
import * as SC from './styles';

const Navbar: FC = () => {
    const { pathname } = useLocation();

    return (
        <SC.StyledNavigationBlock>
            {navBarLinks.map(({ id, name, to }) => (
                <SC.StyledNavLink $isActive={pathname.slice(1) === name.toLocaleLowerCase()} key={id} to={to}>{name}</SC.StyledNavLink>
            ))}
        </SC.StyledNavigationBlock>
    )
};

export default Navbar

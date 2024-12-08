import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { navBarLinks } from '../../data/navbarLinks';
import Button from '../Button';
import * as SC from './styles';

const Navbar: FC = () => {
    const { pathname } = useLocation();

    return (
        <SC.StyledNavigationBlock>
            {navBarLinks.map(({ id, name, to }) => <Button key={id} name={name} to={to} isActive={pathname.slice(1) === name.toLocaleLowerCase()} />)}
        </SC.StyledNavigationBlock>
    )
};

export default Navbar

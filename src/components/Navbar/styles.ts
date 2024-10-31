import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledNavigationBlock = styled.nav`
    width: 100%;
    max-width: 285px;
    display: flex;
    justify-content: space-between;
`;

export const StyledNavLink = styled(Link) <{ $isActive: boolean }>`
    text-decoration: none;
    background-color: ${({ $isActive }) => $isActive ? '#F5F5F5' : 'darkgrey'};
    color: ${({ $isActive }) => $isActive ? '#6D6AE0' : '#FFF'};
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;

    @media (max-width: 326px){
      padding: 5px;
      border-radius: 5px; 
      font-weight: 500;
    }
`;

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
    background-color: ${({ $isActive }) => $isActive ? '#50C700' : 'darkgrey'};
    color: ${({ $isActive }) => $isActive ? '#333B7E' : '#FFF'};
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;

    @media (max-width: 326px){
      padding: 5px;
      border-radius: 5px; 
      font-weight: 500;
    }
`;

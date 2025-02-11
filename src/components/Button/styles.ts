import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const StyledGetMoreInfoButton = styled.button<{ $isLoading: boolean, $color: string, $bgColor: string, $borderColor: string, $isDark: boolean }>`
  min-width: 115.48px;
  min-height: 38px;
  color:${({ $color }) => $color};
  background-color: ${({ $bgColor }) => $bgColor};
  padding: 10px;
  border-radius: 12px;
  font-weight: 600;
  outline: none;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: ${({ $isLoading }) => $isLoading && 'none'};
  ${({ $isDark }) => $isDark && css`box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);`}

  &:hover {
    ${({ $isDark }) => $isDark ?
    css`
            background-color: #e0a800;
            color: #fff; 
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); 
            `
    :
    css`
            background-color: #9EABA2;
            color: #101010;
            box-shadow: 0 4px 8px rgba(158, 171, 162, 0.2);
            `}
  }
`;

export const StyledNavLink = styled(Link) <{
  $isDark: boolean,
  $isActive: boolean,
  $color: string,
  $bgColor: string,
  $borderColor: string,
  $activeColor: string,
  $activeBackground: string
}>`
      text-decoration: none;
      background-color: ${({ $isActive, $bgColor, $activeBackground }) => $isActive ? $activeBackground : $bgColor};
      color: ${({ $isActive, $activeColor, $color }) => $isActive ? $activeColor : $color};
      padding: 10px;
      border-radius: 10px;
      font-weight: 600;
      border: 1px solid ${({ $borderColor }) => $borderColor};
      ${({ $isDark, $isActive }) => $isDark && $isActive && css`box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);`}
  
      @media (max-width: 326px){
        padding: 5px;
        border-radius: 5px; 
        font-weight: 500;
      }
`;

export const StyledToggleThemeButton = styled.button<{ $isDark: boolean, $color: string, $bgColor: string }>`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  font-size: 22px;
  color:${({ $color }) => $color};

  @media (max-width: 600px){
    width: 50px;
    height: 50px;
    font-size: 30px;
    padding: 0px 10px;
    background-color: ${({ $bgColor }) => $bgColor};
    border-radius: 50%;       
  }
`;

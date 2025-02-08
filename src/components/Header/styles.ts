import styled, { css } from 'styled-components';

export const StyledHeaderMainBlock = styled.header<{ $isDark: boolean, $bgColor: string }>`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    transition: top 0.5s ease;
    align-items: center;
    background-color: ${({ $bgColor }) => $bgColor};
    ${({ $isDark }) => $isDark && css`border-bottom: 1px solid #E0E0E0;`}
    padding: 10px 20px;

    @media (max-width: 600px){
       flex-direction: column;
       align-items: start;
       gap: 15px;
    }
`;

export const StyledSearchBlock = styled.div`
    display: flex;
    gap: 20px;
`;

export const StyledToggleThemeButtonWrapper = styled.div`
    display: block;
    @media (max-width: 600px){
        display: none;
    }
`;

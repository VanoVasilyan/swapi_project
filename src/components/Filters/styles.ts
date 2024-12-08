import styled, { css } from 'styled-components';

export const StyledFilterWrapper = styled.div<{ $bgColor: string, $isDark: boolean }>`
    display: flex;
    flex-direction: column;
    min-width: 306px;
    max-width: 306px;
    gap: 10px;
    background-color: ${({ $bgColor }) => $bgColor};
    ${({ $isDark }) => $isDark && css`
        height: fit-content;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        border: 2px solid #e0e0e0;
    `}

    @media(max-width: 365px){
       min-width: auto;
    }
`;
export const StyledFiltersHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledFilterContainerTitle = styled.h4<{ $color: string }>`
    font-size: 20px;
    margin: 10px 0;
    color: ${({ $color }) => $color};
`;

export const StyledClearFiltersButton = styled.button`
    color: red;
    font-size: 15px;
    font-weight: 500;
    padding: 0;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
`;

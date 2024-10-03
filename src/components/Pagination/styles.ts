import styled, { css } from 'styled-components';

export const StyledPaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    gap: 15px;

    @media(max-width:330px){
        flex-wrap: wrap;
    }
`;

export const StyledPaginationButton = styled.button<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    outline: none;
    padding: 12px 25px;
    min-width: 135px;
    background-color: ${({ disabled }) => disabled ? '#F5F5F5' : 'darkgrey'};
    border: none;
    border-radius: 8px;
    color: ${({ disabled }) => disabled ? 'darkgrey' : '#FFF'};
    font-weight: bold;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    border: 1px solid transparent;

    ${({ disabled }) => !disabled &&
        css`
            &:hover {
                background-color: #F5F5F5;
                color: darkgrey;
                border: 1px solid darkgrey;
            }
        `
    }
`;

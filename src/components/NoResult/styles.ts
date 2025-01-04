import styled from 'styled-components';

export const StyledNoResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const StyledNoResultText = styled.p<{ $color: string }>`
    font-size: 40px;
    color: ${({ $color }) => $color};
`;

export const StyledGoBackButton = styled.button<{ $hoverColor: string }>`
    display: flex;
    align-items: end;
    gap: 10px;
    color: #A9A9A9;
    font-size: 18px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
     color: ${({ $hoverColor }) => $hoverColor};
    }
`;
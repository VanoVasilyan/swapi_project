import styled from 'styled-components';

export const StyledSingleFilterContainer = styled.div``;

export const StyledSingleFilterTitle = styled.p<{ $color: string }>`
    color: ${({ $color }) => $color};
    font-weight: bold;
`;

export const StyledCheckBoxLable = styled.label<{ $color: string }>`
    display: flex;
    width: fit-content;
    gap: 10px;
    color: ${({ $color }) => $color};
    cursor: pointer;
    margin-top: 8px;
    font-weight: 500;
`;

export const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })`
    cursor: pointer;
`;

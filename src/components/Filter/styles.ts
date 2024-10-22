import styled from 'styled-components';

export const StyledFilterContainer = styled.div``;

export const StyledFilterTitle = styled.p`
    color: #333333;
    font-weight: bold;
`;

export const StyledCheckBoxLable = styled.label<{ $isChecked?: boolean }>`
    display: flex;
    gap: 10px;
    color: ${({ $isChecked }) => $isChecked ? '#50C700' : '#333333'};
    cursor: pointer;
    margin-top: 8px;
    font-weight: 500;
`;

export const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })`
    cursor: pointer;
`;

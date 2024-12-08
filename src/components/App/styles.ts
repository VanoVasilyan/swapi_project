import styled from 'styled-components';

export const StyledAppContainer = styled.div<{ $bgColor: string }>`
    background-color: ${({ $bgColor }) => $bgColor};
    height: 100%;
    min-height: 100vh;
`;

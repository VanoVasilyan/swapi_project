import styled from 'styled-components';

export const StyledPlanetsContainer = styled.div``;

export const StyledPlanetsPageMainBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 28px;

    @media(max-width: 740px){
        justify-content: center;
    }
`;

export const StyledPlanetsInnerContainer = styled.div`
    display: flex;
    gap: 140px;

    @media(max-width: 740px){
        flex-wrap: wrap;
        justify-content: center;
        gap: 80px;
    }
`;

export const StyledFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

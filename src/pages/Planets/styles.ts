import styled from 'styled-components';

export const StyledPlanetPageWrapper = styled.div``;

export const StyledPlanetsContainer = styled.div`
    padding: 20px;
`;

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

export const StyledFilterContainerTitle = styled.h4`
    font-size: 20px;
    margin: 10px 0;
    color: #6D6AE0;
`;

export const StyledFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 306px;
    gap: 10px;

    @media(max-width: 365px){
       min-width: auto;
    }
`;

export const StyledFiltersHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledClearFiltersButton = styled.button`
    color: red;
    font-size: 15px;
    font-weight: 500;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
`;

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

export const StyledToggleThemeButtonWrapper = styled.div`
    display: none;
    position: fixed;
    right: 7vw;
    bottom: 14vh;

    @media (max-width: 600px){
        display: block;
    }
`;

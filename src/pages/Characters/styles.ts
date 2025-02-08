import styled from 'styled-components';

export const StyledCharacterPageWrapper = styled.div``;

export const StyledCharactersContainer = styled.div`
    padding: 20px;
`;

export const StyledCharactersPageMainBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 28px;

    @media(max-width: 740px){
        justify-content: center;
    }
`;

export const StyledCharactersInnerContainer = styled.div`
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
    right: 8%;
    bottom: 8%;

    @media (max-width: 600px){
        display: block;
    }
`;

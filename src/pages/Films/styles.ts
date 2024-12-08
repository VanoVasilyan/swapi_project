import styled from 'styled-components';

export const StyledFilmPageWrapper = styled.div``;

export const StyledFilmsContainer = styled.div`
    padding: 20px;
`;

export const StyledFilmsPageMainBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 28px;

    @media(max-width: 740px){
        justify-content: center;
    }
`;

export const StyledFilmsInnerContainer = styled.div`
    display: flex;
    gap: 140px;

    @media(max-width: 740px){
        flex-wrap: wrap;
        justify-content: center;
        gap: 80px;
    }
`;

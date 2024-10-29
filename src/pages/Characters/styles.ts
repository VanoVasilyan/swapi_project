import styled from 'styled-components';

export const StyledCharactersContainer = styled.div``;

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

export const StyledFilterContainerTitle = styled.h4`
    font-size: 20px;
    margin: 10px 0;
    color: #333B7E;
`;

export const StyledFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 240px;
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

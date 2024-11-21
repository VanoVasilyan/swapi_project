import styled, { css } from 'styled-components';

export const StyledSingleFilmContainer = styled.div`
  width: 100%;
  max-width: 350px;
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
`;

export const StyledFilmTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const StyledFilmDetails = styled.div`
  font-size: 16px;
  color: #666;
  margin: 5px 0;
`;

export const StyledFilmDetailsOpeningCrawl = styled.div<{ $showMore: boolean }>`
  font-size: 16px;
  color: #666;
  margin: 5px 0;
  overflow: hidden;

& > ${StyledFilmDetails}{
    line-height: 1.6rem;
    display: -webkit-box; 
    ${({ $showMore }) => !$showMore && css`-webkit-line-clamp: 3;`}
    -webkit-box-orient: vertical;
} 
`;

export const StyledDetailTitle = styled.span`
  font-weight: bold;
  color: #000;
`;

export const StyledShowMoreButton = styled.button`
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    font-size: 14px;
    color: #333B7E;
    font-weight: 600;
`;

export const StyledStarship = styled.div``;

export const StyledCharacter = styled.div``;

export const StyledPlanet = styled.div``;

export const StyledVehicle = styled.div``;

export const StyledSpecies = styled.div``;

import styled, { css } from 'styled-components';

export const StyledSingleFilmContainer = styled.div<{ $bgColor: string }>`
  width: 100%;
  max-width: 350px;
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

export const StyledFilmTitle = styled.h1<{ $color: string }>`
  font-size: 24px;
  color:${({ $color }) => $color};
`;

export const StyledFilmDetails = styled.div<{ $color: string }>`
  font-size: 16px;
  color:${({ $color }) => $color};
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

export const StyledDetailTitle = styled.span<{ $color: string }>`
  font-weight: bold;
  color:${({ $color }) => $color};
`;

export const StyledShowMoreButton = styled.button<{ $color: string }>`
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    font-size: 14px;
    color:${({ $color }) => $color};
    font-weight: 600;
`;

export const StyledStarship = styled.div``;

export const StyledCharacter = styled.div``;

export const StyledPlanet = styled.div``;

export const StyledVehicle = styled.div``;

export const StyledSpecies = styled.div``;

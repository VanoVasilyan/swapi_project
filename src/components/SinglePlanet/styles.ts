import styled from 'styled-components';

export const StyledSinglePlanetContainer = styled.div<{ $bgColor?: string }>`
  width: 100%;
  max-width: 350px;
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

export const StyledPlanetName = styled.h1<{ $color?: string }>`
  font-size: 24px;
  color:${({ $color }) => $color};
`;

export const StyledPlanetDetails = styled.div<{ $color?: string }>`
  font-size: 16px;
  color:${({ $color }) => $color};
  margin: 5px 0;
`;

export const StyledDetailTitle = styled.span<{ $color?: string }>`
  font-weight: bold;
  color:${({ $color }) => $color};
`;

export const StyledFilm = styled.div``;

export const StyledResidence = styled.div``;

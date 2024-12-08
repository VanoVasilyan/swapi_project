import styled from 'styled-components';

export const StyledSingleCharacterContainer = styled.div<{ $bgColor?: string }>`
  width: 100%;
  max-width: 350px;
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

export const StyledCharacterName = styled.h1<{ $color?: string }>`
  font-size: 24px;
  color:${({ $color }) => $color};
`;

export const StyledCharacterDetails = styled.div<{ $color?: string }>`
  font-size: 16px;
  color:${({ $color }) => $color};
  margin: 5px 0;
`;

export const StyledDetailTitle = styled.span<{ $color?: string }>`
  font-weight: bold;
  color:${({ $color }) => $color};
`;

export const StyledSpecies = styled.div``;

export const StyledVehicle = styled.div``;

export const StyledStarship = styled.div``;

export const StyledFilm = styled.div``;

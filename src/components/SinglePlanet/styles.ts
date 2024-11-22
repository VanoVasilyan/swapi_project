import styled from 'styled-components';

export const StyledSinglePlanetContainer = styled.div`
  width: 100%;
  max-width: 350px;
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
`;

export const StyledPlanetName = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const StyledPlanetDetails = styled.div`
  font-size: 16px;
  color: #666;
  margin: 5px 0;
`;

export const StyledDetailTitle = styled.span`
  font-weight: bold;
  color: #000;
`;

export const StyledFilm = styled.div``;

export const StyledResidence = styled.div``;

export const StyledGetMoreInfoButton = styled.button<{ $isLoading: boolean }>`
  min-width: 115.48px;
  min-height: 38px;
  color: #6D6AE0;
  background-color: #F5F5F5;
  padding: 10px;
  border-radius: 12px;
  font-weight: 600;
  outline: none;
  border: 1px solid #6D6AE0;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: ${({ $isLoading }) => $isLoading && 'none'};

  &:hover {
    background-color: #6D6AE0;
    color: #F5F5F5;
    border-color: #5A58CC;
    box-shadow: 0 4px 8px rgba(109, 106, 224, 0.2);
  }
`;

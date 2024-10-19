import React, { FC } from 'react';
import { TSinglePlanet } from './types';
import * as SC from './styles';

const SinglePlanet: FC<TSinglePlanet> = ({
    name,
    rotationPeriod,
    diameter,
    orbitalPeriod,
    gravity,
    climate,
    surfaceWater,
    terrain,
    residents,
    films,
    population,
}) => {
    return (
        <SC.StyledSinglePlanetContainer>
            <SC.StyledPlanetName>{name}</SC.StyledPlanetName>
            {rotationPeriod && <SC.StyledPlanetDetails> <SC.StyledDetailTitle>Rotation Period:</SC.StyledDetailTitle> {rotationPeriod} hours</SC.StyledPlanetDetails>}
            {orbitalPeriod && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Orbital Period:</SC.StyledDetailTitle> {orbitalPeriod} days</SC.StyledPlanetDetails>}
            {diameter && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Diameter:</SC.StyledDetailTitle> {diameter} km</SC.StyledPlanetDetails>}
            {climate && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Climate:</SC.StyledDetailTitle> {climate}</SC.StyledPlanetDetails>}
            {gravity && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Gravity:</SC.StyledDetailTitle> {gravity}</SC.StyledPlanetDetails>}
            {terrain && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Terrain:</SC.StyledDetailTitle> {terrain}</SC.StyledPlanetDetails>}
            {surfaceWater && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Surface Water:</SC.StyledDetailTitle> {surfaceWater}%</SC.StyledPlanetDetails>}
            {population && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Population:</SC.StyledDetailTitle> {population}</SC.StyledPlanetDetails>}
            {residents && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Residents:</SC.StyledDetailTitle> {residents} known residents</SC.StyledPlanetDetails>}
            {films && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Films:</SC.StyledDetailTitle> {films} films featured</SC.StyledPlanetDetails>}
        </SC.StyledSinglePlanetContainer >
    )
};

export default SinglePlanet

import React, { FC } from 'react';
import { IPlanet } from '../../types/global';
import * as SC from './styles';

const SinglePlanet: FC<IPlanet> = ({
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
}) => {
    return (
        <SC.StyledSinglePlanetContainer>
            {/* Component Refactoring TODO */}

            <SC.StyledPlanetName>{name !== 'unknown' ? name : 'New Planet'}</SC.StyledPlanetName>
            {Number(rotation_period) > 0 && rotation_period !== 'unknown' && <SC.StyledPlanetDetails > <SC.StyledDetailTitle>Rotation Period:</SC.StyledDetailTitle> {rotation_period} hours</SC.StyledPlanetDetails>}
            {Number(orbital_period) > 0 && orbital_period !== 'unknown' && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Orbital Period:</SC.StyledDetailTitle> {orbital_period} days</SC.StyledPlanetDetails>}
            {Number(diameter) > 0 && diameter !== 'unknown' && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Diameter:</SC.StyledDetailTitle> {diameter} km</SC.StyledPlanetDetails>}
            {climate !== 'unknown' && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Climate:</SC.StyledDetailTitle> {climate}</SC.StyledPlanetDetails>}
            {gravity !== 'unknown' && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Gravity:</SC.StyledDetailTitle> {gravity}</SC.StyledPlanetDetails>}
            {terrain !== 'unknown' && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Terrain:</SC.StyledDetailTitle> {terrain}</SC.StyledPlanetDetails>}
            {Number(surface_water) > 0 && surface_water !== 'unknown' && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Surface Water:</SC.StyledDetailTitle> {surface_water}%</SC.StyledPlanetDetails>}
            {Number(population) > 0 && population !== 'unknown' && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Population:</SC.StyledDetailTitle> {population}</SC.StyledPlanetDetails>}
            {!!residents.length && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Residents:</SC.StyledDetailTitle> {residents.length} known residents</SC.StyledPlanetDetails>}
            {!!films.length && <SC.StyledPlanetDetails><SC.StyledDetailTitle>Films:</SC.StyledDetailTitle> {films.length} films featured</SC.StyledPlanetDetails>}
        </SC.StyledSinglePlanetContainer >
    )
};

export default SinglePlanet

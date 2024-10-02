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
            <SC.StyledPlanetName>{name}</SC.StyledPlanetName>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Rotation Period:</SC.StyledDetailTitle> {rotation_period} hours</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Orbital Period:</SC.StyledDetailTitle> {orbital_period} days</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Diameter:</SC.StyledDetailTitle> {diameter} km</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Climate:</SC.StyledDetailTitle> {climate}</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Gravity:</SC.StyledDetailTitle> {gravity}</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Terrain:</SC.StyledDetailTitle> {terrain}</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Surface Water:</SC.StyledDetailTitle> {surface_water}%</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Population:</SC.StyledDetailTitle> {population}</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Residents:</SC.StyledDetailTitle> {residents.length} known residents</SC.StyledPlanetDetails>
            <SC.StyledPlanetDetails><SC.StyledDetailTitle>Films:</SC.StyledDetailTitle> {films.length} films featured</SC.StyledPlanetDetails>
        </SC.StyledSinglePlanetContainer>
    )
};

export default SinglePlanet

import React, { FC } from 'react';
import Loading from '../Loading';
import { useSinglePlanet } from './useSinglePlanet';
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
    const { isFetching, isResidentFetching, filmTitlesMemoized, residentsNamesMemoized } = useSinglePlanet(films as string[], residents as string[]);

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
            {isResidentFetching ? <Loading /> : residentsNamesMemoized.length ? (
                <SC.StyledPlanetDetails>
                    <SC.StyledDetailTitle>Residents:</SC.StyledDetailTitle>
                    {residentsNamesMemoized.map((resident, index) => <SC.StyledResidence key={index}>{resident}</SC.StyledResidence>)}
                </SC.StyledPlanetDetails>
            ) : null}
            {isFetching ? <Loading /> : filmTitlesMemoized.length ? (
                <SC.StyledPlanetDetails>
                    <SC.StyledDetailTitle>Films:</SC.StyledDetailTitle>
                    {filmTitlesMemoized.map(film => <SC.StyledFilm key={film}>{film}</SC.StyledFilm>)}
                </SC.StyledPlanetDetails>
            ) : null}
        </SC.StyledSinglePlanetContainer >
    )
};

export default SinglePlanet

import React, { FC } from 'react';
import { useGlobalThemeContext } from '../../context/theme';
import Button from '../Button';
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
    const {
        filmsId,
        residentsId,
        isFetching,
        isResidentFetching,
        filmTitlesMemoized,
        residentsNamesMemoized,
        getFilmsAndResidents,
    } = useSinglePlanet(films as string[], residents as string[]);
    const { theme } = useGlobalThemeContext();

    return (
        <SC.StyledSinglePlanetContainer $bgColor={theme.card.background}>
            <SC.StyledPlanetName $color={theme.card.heading}>{name}</SC.StyledPlanetName>
            {rotationPeriod && <SC.StyledPlanetDetails $color={theme.card.text}> <SC.StyledDetailTitle $color={theme.card.title}>Rotation Period:</SC.StyledDetailTitle> {rotationPeriod} hours</SC.StyledPlanetDetails>}
            {orbitalPeriod && <SC.StyledPlanetDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Orbital Period:</SC.StyledDetailTitle> {orbitalPeriod} days</SC.StyledPlanetDetails>}
            {diameter && <SC.StyledPlanetDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Diameter:</SC.StyledDetailTitle> {diameter} km</SC.StyledPlanetDetails>}
            {climate && <SC.StyledPlanetDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Climate:</SC.StyledDetailTitle> {climate}</SC.StyledPlanetDetails>}
            {gravity && <SC.StyledPlanetDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Gravity:</SC.StyledDetailTitle> {gravity}</SC.StyledPlanetDetails>}
            {terrain && <SC.StyledPlanetDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Terrain:</SC.StyledDetailTitle> {terrain}</SC.StyledPlanetDetails>}
            {surfaceWater && <SC.StyledPlanetDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Surface Water:</SC.StyledDetailTitle> {surfaceWater}%</SC.StyledPlanetDetails>}
            {population && <SC.StyledPlanetDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Population:</SC.StyledDetailTitle> {population}</SC.StyledPlanetDetails>}
            {(!filmTitlesMemoized.length && !residentsNamesMemoized.length && (filmsId?.length || residentsId?.length)) &&
                <Button
                    type='getMoreInfo'
                    isLoading={isResidentFetching || isFetching}
                    onClick={getFilmsAndResidents}
                />
            }
            {residentsNamesMemoized.length ? (
                <SC.StyledPlanetDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Residents:</SC.StyledDetailTitle>
                    {residentsNamesMemoized.map((resident, index) => <SC.StyledResidence key={index}>{resident}</SC.StyledResidence>)}
                </SC.StyledPlanetDetails>
            ) : null}
            {filmTitlesMemoized.length ? (
                <SC.StyledPlanetDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Films:</SC.StyledDetailTitle>
                    {filmTitlesMemoized.map(film => <SC.StyledFilm key={film}>{film}</SC.StyledFilm>)}
                </SC.StyledPlanetDetails>
            ) : null}
        </SC.StyledSinglePlanetContainer >
    )
};

export default SinglePlanet

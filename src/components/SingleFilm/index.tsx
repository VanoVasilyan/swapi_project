import React, { FC } from 'react';
import { useGlobalThemeContext } from '../../context/theme';
import Button from '../Button';
import { useSingleFilm } from './useSingleFilm';
import { TSingleFilm } from './types';
import * as SC from './styles';

const SingleFilm: FC<TSingleFilm> = ({
    title,
    openingCrawl,
    director,
    producer,
    releaseDate,
    characters,
    planets,
    starships,
    vehicles,
    species,
}) => {
    const {
        showMore,
        handleShowMore,
        isCharacterFetching,
        isStarshipsFetching,
        isSpeciesFetching,
        isVehiclesFetching,
        isPlanetFetching,
        characterNamesMemoized,
        planetNamesMemoized,
        starshipNamesMemoized,
        vehicleNamesMemoized,
        speciesNamesMemoized,
        getCharactersSpeciesVehiclesStarshipsAndPlanets
    } = useSingleFilm(characters as string[], planets as string[], starships as string[], vehicles as string[], species as string[]);
    const { theme } = useGlobalThemeContext();

    return (
        <SC.StyledSingleFilmContainer $bgColor={theme.card.background}>
            <SC.StyledFilmTitle $color={theme.card.heading}>{title}</SC.StyledFilmTitle>
            {director && <SC.StyledFilmDetails $color={theme.card.text}> <SC.StyledDetailTitle $color={theme.card.title}>Director:</SC.StyledDetailTitle> {director}</SC.StyledFilmDetails>}
            {producer && <SC.StyledFilmDetails $color={theme.card.text}> <SC.StyledDetailTitle $color={theme.card.title}>Producer:</SC.StyledDetailTitle> {producer}</SC.StyledFilmDetails>}
            {releaseDate && <SC.StyledFilmDetails $color={theme.card.text}> <SC.StyledDetailTitle $color={theme.card.title}>Release Date:</SC.StyledDetailTitle> {releaseDate.split('-')[0]}</SC.StyledFilmDetails>}
            {openingCrawl &&
                <SC.StyledFilmDetailsOpeningCrawl $showMore={showMore}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Opening Crawl: <SC.StyledShowMoreButton $color={theme.card.showMore.color} onClick={handleShowMore}>{`show ${showMore ? 'less' : 'more'}`}</SC.StyledShowMoreButton></SC.StyledDetailTitle>
                    <SC.StyledFilmDetails $color={theme.card.text}>{openingCrawl}</SC.StyledFilmDetails>
                </SC.StyledFilmDetailsOpeningCrawl>}
            {(!characterNamesMemoized.length && !speciesNamesMemoized.length && !planetNamesMemoized.length && !starshipNamesMemoized.length && !vehicleNamesMemoized.length) &&
                <Button
                    type='getMoreInfo'
                    isLoading={
                        isCharacterFetching ||
                        isSpeciesFetching ||
                        isPlanetFetching ||
                        isStarshipsFetching ||
                        isVehiclesFetching
                    }
                    onClick={getCharactersSpeciesVehiclesStarshipsAndPlanets}
                />
            }
            {characterNamesMemoized.length ? (
                <SC.StyledFilmDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Characters:</SC.StyledDetailTitle>
                    {characterNamesMemoized.map((character, index) => <SC.StyledCharacter key={index}>{character}</SC.StyledCharacter>)}
                </SC.StyledFilmDetails>
            ) : null}
            {planetNamesMemoized.length ? (
                <SC.StyledFilmDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Planets:</SC.StyledDetailTitle>
                    {planetNamesMemoized.map((planet, index) => <SC.StyledPlanet key={index}>{planet}</SC.StyledPlanet>)}
                </SC.StyledFilmDetails>
            ) : null}
            {starshipNamesMemoized.length ? (
                <SC.StyledFilmDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Starships:</SC.StyledDetailTitle>
                    {starshipNamesMemoized.map(starship => <SC.StyledStarship key={starship}>{starship}</SC.StyledStarship>)}
                </SC.StyledFilmDetails>
            ) : null}
            {vehicleNamesMemoized.length ? (
                <SC.StyledFilmDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Vehicles:</SC.StyledDetailTitle>
                    {vehicleNamesMemoized.map(vehicle => <SC.StyledVehicle key={vehicle}>{vehicle}</SC.StyledVehicle>)}
                </SC.StyledFilmDetails>
            ) : null}
            {speciesNamesMemoized.length ? (
                <SC.StyledFilmDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Species:</SC.StyledDetailTitle>
                    {speciesNamesMemoized.map(species => <SC.StyledSpecies key={species}>{species}</SC.StyledSpecies>)}
                </SC.StyledFilmDetails>
            ) : null}
        </SC.StyledSingleFilmContainer >
    )
};

export default SingleFilm

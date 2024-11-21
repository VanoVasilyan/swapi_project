import React, { FC } from 'react';
import Loading from '../Loading';
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
        speciesNamesMemoized
    } = useSingleFilm(characters as string[], planets as string[], starships as string[], vehicles as string[], species as string[]);

    return (
        <SC.StyledSingleFilmContainer>
            <SC.StyledFilmTitle>{title}</SC.StyledFilmTitle>
            {director && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Director:</SC.StyledDetailTitle> {director}</SC.StyledFilmDetails>}
            {producer && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Producer:</SC.StyledDetailTitle> {producer}</SC.StyledFilmDetails>}
            {releaseDate && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Release Date:</SC.StyledDetailTitle> {releaseDate.split('-')[0]}</SC.StyledFilmDetails>}
            {isCharacterFetching ? <Loading /> : characterNamesMemoized.length ? (
                <SC.StyledFilmDetails>
                    <SC.StyledDetailTitle>Characters:</SC.StyledDetailTitle>
                    {characterNamesMemoized.map((character, index) => <SC.StyledCharacter key={index}>{character}</SC.StyledCharacter>)}
                </SC.StyledFilmDetails>
            ) : null}
            {isPlanetFetching ? <Loading /> : planetNamesMemoized.length ? (
                <SC.StyledFilmDetails>
                    <SC.StyledDetailTitle>Planets:</SC.StyledDetailTitle>
                    {planetNamesMemoized.map((planet, index) => <SC.StyledPlanet key={index}>{planet}</SC.StyledPlanet>)}
                </SC.StyledFilmDetails>
            ) : null}
            {isStarshipsFetching ? <Loading /> : starshipNamesMemoized.length ? (
                <SC.StyledFilmDetails>
                    <SC.StyledDetailTitle>Starships:</SC.StyledDetailTitle>
                    {starshipNamesMemoized.map(starship => <SC.StyledStarship key={starship}>{starship}</SC.StyledStarship>)}
                </SC.StyledFilmDetails>
            ) : null}
            {isVehiclesFetching ? <Loading /> : vehicleNamesMemoized.length ? (
                <SC.StyledFilmDetails>
                    <SC.StyledDetailTitle>Vehicles:</SC.StyledDetailTitle>
                    {vehicleNamesMemoized.map(vehicle => <SC.StyledVehicle key={vehicle}>{vehicle}</SC.StyledVehicle>)}
                </SC.StyledFilmDetails>
            ) : null}
            {isSpeciesFetching ? <Loading /> : speciesNamesMemoized.length ? (
                <SC.StyledFilmDetails>
                    <SC.StyledDetailTitle>Species:</SC.StyledDetailTitle>
                    {speciesNamesMemoized.map(species => <SC.StyledSpecies key={species}>{species}</SC.StyledSpecies>)}
                </SC.StyledFilmDetails>
            ) : null}
            {openingCrawl &&
                <SC.StyledFilmDetailsOpeningCrawl $showMore={showMore}>
                    <SC.StyledDetailTitle>Opening Crawl: <SC.StyledShowMoreButton onClick={handleShowMore}>{`show ${showMore ? 'less' : 'more'}`}</SC.StyledShowMoreButton></SC.StyledDetailTitle>
                    <SC.StyledFilmDetails>{openingCrawl}</SC.StyledFilmDetails>
                </SC.StyledFilmDetailsOpeningCrawl>}
        </SC.StyledSingleFilmContainer>
    )
};

export default SingleFilm

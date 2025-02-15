import React, { FC } from 'react';
import { useGlobalThemeContext } from '../../context/theme';
import Button from '../Button';
import { useSingleFilm } from './useSingleFilm';
import { TSingleFilm } from './types';
import * as SC from './styles';

const SingleFilm: FC<TSingleFilm> = ({
    characters,
    planets,
    starships,
    vehicles,
    species,
    filmDetails,
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
            {filmDetails.map(detail => {
                if (detail.key === 'title') {
                    return <SC.StyledFilmTitle key={detail.id} $color={theme.card.heading}>{detail.value}</SC.StyledFilmTitle>
                } else if (detail.key === 'openingCrawl') {
                    return (
                        <SC.StyledFilmDetailsOpeningCrawl key={detail.id} $showMore={showMore}>
                            <SC.StyledDetailTitle $color={theme.card.title}>{detail.title} <SC.StyledShowMoreButton $color={theme.card.showMore.color} onClick={handleShowMore}>{`show ${showMore ? 'less' : 'more'}`}</SC.StyledShowMoreButton></SC.StyledDetailTitle>
                            <SC.StyledFilmDetails $color={theme.card.text}>{detail.value}</SC.StyledFilmDetails>
                        </SC.StyledFilmDetailsOpeningCrawl>
                    )
                }
                return (
                    <SC.StyledFilmDetails key={detail.id} $color={theme.card.text}>
                        <SC.StyledDetailTitle $color={theme.card.title}>{detail.title}</SC.StyledDetailTitle> {detail.value}
                    </SC.StyledFilmDetails>
                )
            })}
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

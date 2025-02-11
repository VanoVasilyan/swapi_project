import React, { FC } from 'react';
import { useGlobalThemeContext } from '../../context/theme';
import Button from '../Button';
import { useSingleCharacter } from './useSingleCharacter';
import { TSingleCharacter } from './types';
import * as SC from './styles';

const SingleCharacter: FC<TSingleCharacter> = ({
    name,
    height,
    mass,
    hairColor,
    skinColor,
    eyeColor,
    films,
    species,
    vehicles,
    starships,
}) => {
    const {
        isFetching,
        isSpeciesFetching,
        isVehiclesFetching,
        isStarshipsFetching,
        filmTitlesMemoized,
        speciesNamesMemoized,
        vehicleNamesMemoized,
        starshipNamesMemoized,
        getFilmsSpeciesVehiclesStarships
    } = useSingleCharacter(films as string[], species as string[], vehicles as string[], starships as string[]);
    const { theme } = useGlobalThemeContext();
    // TODO Refactor ******
    return (
        <SC.StyledSingleCharacterContainer $bgColor={theme.card.background}>
            <SC.StyledCharacterName $color={theme.card.heading}>{name}</SC.StyledCharacterName>
            {height && <SC.StyledCharacterDetails $color={theme.card.text}> <SC.StyledDetailTitle $color={theme.card.title}>Height:</SC.StyledDetailTitle> {height} sm</SC.StyledCharacterDetails>}
            {mass && <SC.StyledCharacterDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Mass:</SC.StyledDetailTitle> {mass}</SC.StyledCharacterDetails>}
            {hairColor && <SC.StyledCharacterDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Hair Color:</SC.StyledDetailTitle> {hairColor}</SC.StyledCharacterDetails>}
            {skinColor && <SC.StyledCharacterDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Skin Color:</SC.StyledDetailTitle> {skinColor}</SC.StyledCharacterDetails>}
            {eyeColor && <SC.StyledCharacterDetails $color={theme.card.text}><SC.StyledDetailTitle $color={theme.card.title}>Eye Color:</SC.StyledDetailTitle> {eyeColor}</SC.StyledCharacterDetails>}
            {(!filmTitlesMemoized.length && !speciesNamesMemoized.length && !starshipNamesMemoized.length && !vehicleNamesMemoized.length) &&
                <Button
                    type='getMoreInfo'
                    isLoading={isFetching || isSpeciesFetching || isStarshipsFetching || isVehiclesFetching}
                    onClick={getFilmsSpeciesVehiclesStarships}
                />
            }
            {speciesNamesMemoized.length ? (
                <SC.StyledCharacterDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Species:</SC.StyledDetailTitle>
                    {speciesNamesMemoized.map(species => <SC.StyledSpecies key={species}>{species}</SC.StyledSpecies>)}
                </SC.StyledCharacterDetails>
            ) : null}
            {vehicleNamesMemoized.length ? (
                <SC.StyledCharacterDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Vehicles:</SC.StyledDetailTitle>
                    {vehicleNamesMemoized.map(vehicle => <SC.StyledVehicle key={vehicle}>{vehicle}</SC.StyledVehicle>)}
                </SC.StyledCharacterDetails>
            ) : null}
            {starshipNamesMemoized.length ? (
                <SC.StyledCharacterDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Starships:</SC.StyledDetailTitle>
                    {starshipNamesMemoized.map(starship => <SC.StyledStarship key={starship}>{starship}</SC.StyledStarship>)}
                </SC.StyledCharacterDetails>
            ) : null}
            {filmTitlesMemoized.length ? (
                <SC.StyledCharacterDetails $color={theme.card.text}>
                    <SC.StyledDetailTitle $color={theme.card.title}>Films:</SC.StyledDetailTitle>
                    {filmTitlesMemoized.map(film => <SC.StyledFilm key={film}>{film}</SC.StyledFilm>)}
                </SC.StyledCharacterDetails>
            ) : null}
        </SC.StyledSingleCharacterContainer>
    )
};

export default SingleCharacter

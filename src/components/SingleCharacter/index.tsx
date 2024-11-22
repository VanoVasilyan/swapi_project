import React, { FC } from 'react';
import Loading from '../Loading';
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
    starships
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

    return (
        <SC.StyledSingleCharacterContainer>
            <SC.StyledCharacterName>{name}</SC.StyledCharacterName>
            {height && <SC.StyledCharacterDetails> <SC.StyledDetailTitle>Height:</SC.StyledDetailTitle> {height} sm</SC.StyledCharacterDetails>}
            {mass && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Mass:</SC.StyledDetailTitle> {mass}</SC.StyledCharacterDetails>}
            {hairColor && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Hair Color:</SC.StyledDetailTitle> {hairColor}</SC.StyledCharacterDetails>}
            {skinColor && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Skin Color:</SC.StyledDetailTitle> {skinColor}</SC.StyledCharacterDetails>}
            {eyeColor && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Eye Color:</SC.StyledDetailTitle> {eyeColor}</SC.StyledCharacterDetails>}
            {(!filmTitlesMemoized.length && !speciesNamesMemoized.length && !starshipNamesMemoized.length && !vehicleNamesMemoized.length) && 
            <SC.StyledGetMoreInfoButton $isLoading={isFetching || isSpeciesFetching || isStarshipsFetching || isVehiclesFetching} onClick={getFilmsSpeciesVehiclesStarships}>{isFetching || isSpeciesFetching || isStarshipsFetching || isVehiclesFetching ?
                <Loading $left='38px' $top='-8px' /> : 'Get More Info'
            }</SC.StyledGetMoreInfoButton>}
            {speciesNamesMemoized.length ? (
                <SC.StyledCharacterDetails>
                    <SC.StyledDetailTitle>Species:</SC.StyledDetailTitle>
                    {speciesNamesMemoized.map(species => <SC.StyledSpecies key={species}>{species}</SC.StyledSpecies>)}
                </SC.StyledCharacterDetails>
            ) : null}
            {vehicleNamesMemoized.length ? (
                <SC.StyledCharacterDetails>
                    <SC.StyledDetailTitle>Vehicles:</SC.StyledDetailTitle>
                    {vehicleNamesMemoized.map(vehicle => <SC.StyledVehicle key={vehicle}>{vehicle}</SC.StyledVehicle>)}
                </SC.StyledCharacterDetails>
            ) : null}
            {starshipNamesMemoized.length ? (
                <SC.StyledCharacterDetails>
                    <SC.StyledDetailTitle>Starships:</SC.StyledDetailTitle>
                    {starshipNamesMemoized.map(starship => <SC.StyledStarship key={starship}>{starship}</SC.StyledStarship>)}
                </SC.StyledCharacterDetails>
            ) : null}
            {filmTitlesMemoized.length ? (
                <SC.StyledCharacterDetails>
                    <SC.StyledDetailTitle>Films:</SC.StyledDetailTitle>
                    {filmTitlesMemoized.map(film => <SC.StyledFilm key={film}>{film}</SC.StyledFilm>)}
                </SC.StyledCharacterDetails>
            ) : null}
        </SC.StyledSingleCharacterContainer>
    )
};

export default SingleCharacter

import React, { FC } from 'react';
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
    return (
        <SC.StyledSingleCharacterContainer>
            <SC.StyledCharacterName>{name}</SC.StyledCharacterName>
            {height && <SC.StyledCharacterDetails> <SC.StyledDetailTitle>Height:</SC.StyledDetailTitle> {height} sm</SC.StyledCharacterDetails>}
            {mass && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Mass:</SC.StyledDetailTitle> {mass}</SC.StyledCharacterDetails>}
            {hairColor && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Hair Color:</SC.StyledDetailTitle> {hairColor}</SC.StyledCharacterDetails>}
            {skinColor && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Skin Color:</SC.StyledDetailTitle> {skinColor}</SC.StyledCharacterDetails>}
            {eyeColor && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Eye Color:</SC.StyledDetailTitle> {eyeColor}</SC.StyledCharacterDetails>}
            {species && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Species:</SC.StyledDetailTitle> {species}</SC.StyledCharacterDetails>}
            {vehicles && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Vehicles:</SC.StyledDetailTitle> {vehicles}</SC.StyledCharacterDetails>}
            {starships && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Starships:</SC.StyledDetailTitle> {starships}</SC.StyledCharacterDetails>}
            {films && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Films:</SC.StyledDetailTitle> {films} films featured</SC.StyledCharacterDetails>}
        </SC.StyledSingleCharacterContainer>
    )
};

export default SingleCharacter

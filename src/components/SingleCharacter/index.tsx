import React, { FC } from 'react';
import { TSingleCharacter } from './types';
import * as SC from './styles';

const SingleCharacter: FC<TSingleCharacter> = ({
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
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
            {hair_color && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Hair Color:</SC.StyledDetailTitle> {hair_color}</SC.StyledCharacterDetails>}
            {skin_color && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Skin Color:</SC.StyledDetailTitle> {skin_color}</SC.StyledCharacterDetails>}
            {eye_color && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Eye Color:</SC.StyledDetailTitle> {eye_color}</SC.StyledCharacterDetails>}
            {species && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Species:</SC.StyledDetailTitle> {species}</SC.StyledCharacterDetails>}
            {vehicles && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Vehicles:</SC.StyledDetailTitle> {vehicles}</SC.StyledCharacterDetails>}
            {starships && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Starships:</SC.StyledDetailTitle> {starships}</SC.StyledCharacterDetails>}
            {films && <SC.StyledCharacterDetails><SC.StyledDetailTitle>Films:</SC.StyledDetailTitle> {films} films featured</SC.StyledCharacterDetails>}
        </SC.StyledSingleCharacterContainer>
    )
};

export default SingleCharacter

import React, { FC } from 'react';
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
    const { showMore, handleShowMore } = useSingleFilm();

    return (
        <SC.StyledSingleFilmContainer>
            <SC.StyledFilmTitle>{title}</SC.StyledFilmTitle>
            {director && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Director:</SC.StyledDetailTitle> {director}</SC.StyledFilmDetails>}
            {producer && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Producer:</SC.StyledDetailTitle> {producer}</SC.StyledFilmDetails>}
            {releaseDate && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Release Date:</SC.StyledDetailTitle> {releaseDate.split('-')[0]}</SC.StyledFilmDetails>}
            {characters && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Characters:</SC.StyledDetailTitle> {characters}</SC.StyledFilmDetails>}
            {planets && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Planets:</SC.StyledDetailTitle> {planets}</SC.StyledFilmDetails>}
            {starships && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Starships:</SC.StyledDetailTitle> {starships}</SC.StyledFilmDetails>}
            {vehicles && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Vehicles:</SC.StyledDetailTitle> {vehicles}</SC.StyledFilmDetails>}
            {species && <SC.StyledFilmDetails> <SC.StyledDetailTitle>Species:</SC.StyledDetailTitle> {species}</SC.StyledFilmDetails>}
            {openingCrawl &&
                <SC.StyledFilmDetailsOpeningCrawl $showMore={showMore}>
                    <SC.StyledDetailTitle>Opening Crawl: <SC.StyledShowMoreButton onClick={handleShowMore}>{`show ${showMore ? 'less' : 'more'}`}</SC.StyledShowMoreButton></SC.StyledDetailTitle>
                    <SC.StyledFilmDetails>{openingCrawl}</SC.StyledFilmDetails>
                </SC.StyledFilmDetailsOpeningCrawl>}
        </SC.StyledSingleFilmContainer>
    )
}

export default SingleFilm
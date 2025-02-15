import React, { FC } from 'react';
import { useGlobalThemeContext } from '../../context/theme';
import Button from '../Button';
import { useSinglePlanet } from './useSinglePlanet';
import { TSinglePlanet } from './types';
import * as SC from './styles';

const SinglePlanet: FC<TSinglePlanet> = ({
    films,
    residents,
    planetDetails,
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
            {planetDetails.map((detail) => {
                if (detail.key === 'name') {
                    return (
                        <SC.StyledPlanetName key={detail.id} $color={theme.card.heading}>
                            {detail.value}
                        </SC.StyledPlanetName>
                    )
                }
                return (
                    <SC.StyledPlanetDetails key={detail.id} $color={theme.card.text}>
                        <SC.StyledDetailTitle $color={theme.card.title}>{detail.title}</SC.StyledDetailTitle> {detail.value}
                    </SC.StyledPlanetDetails>
                )
            })}
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

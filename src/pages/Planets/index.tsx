import React, { FC } from 'react';
import { usePlanets } from './usePlanets';
import SinglePlanet from '../../components/SinglePlanet';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import * as SC from './styles';

const Planets: FC = () => {
    const {
        next,
        isLoading,
        results,
        previous,
        climates,
        nextPageLoading,
        previousPageLoading,
        nextPage,
        previousPage,
        handleSelectChange,
    } = usePlanets();

    if (isLoading || nextPageLoading || previousPageLoading) {
        return <Loading $top='30%' $left='50%' $width='80px' $height='80px' />
    }

    return (
        <SC.StyledPlanetsContainer>
            <SC.StyledPlanetsPageMainBlock>
                {Array.isArray(results) && !!results?.length ? (
                    results.map(item => (
                        <SinglePlanet key={item.name} {...item} />
                    ))
                    /* {!!climates.length && (
                    <>
                        <select onChange={handleSelectChange}>
                            <option hidden>Climates</option>
                            {climates.map(({ climate }: { climate: string }) => (
                                <option key={climate} value={climate}>{climate}</option>
                            ))}
                        </select>
                    </>
                )} */
                ) : <div>Nothing found !!!</div>}
            </SC.StyledPlanetsPageMainBlock>
            <Pagination previous={previous} next={next} nextPage={nextPage} previousPage={previousPage} />
        </SC.StyledPlanetsContainer>
    )
};

export default Planets

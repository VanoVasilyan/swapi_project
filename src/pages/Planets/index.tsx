import React, { FC } from 'react';
import { usePlanets } from './usePlanets';
import SinglePlanet from '../../components/SinglePlanet';
import Loading from '../../components/Loading';
import NoResult from '../../components/NoResult';
import Pagination from '../../components/Pagination';
import Filter from '../../components/Filter';
import * as SC from './styles';

const Planets: FC = () => {
    const {
        next,
        isLoading,
        finalResults,
        previous,
        filterItems,
        nextPageLoading,
        previousPageLoading,
        nextPage,
        previousPage,
        handleSelectChange,
    } = usePlanets();

    if (isLoading || nextPageLoading || previousPageLoading) {
        return <Loading $top='30%' $left='50%' $width='80px' $height='80px' />
    };

    return (
        <SC.StyledPlanetsContainer>
            <SC.StyledPlanetsInnerContainer>
                <SC.StyledFilterWrapper>
                    {filterItems.map(({ id, title, items }) => (<Filter key={id} title={title} data={items} onChange={(e) => handleSelectChange(e, title)} />))}
                </SC.StyledFilterWrapper>
                <SC.StyledPlanetsPageMainBlock>
                    {Array.isArray(finalResults) && !!finalResults?.length ? (
                        finalResults.map((result, ind) => (
                            <SinglePlanet key={ind} {...result} />
                        ))
                    ) : <NoResult text='Nothing found, please change filters.' />}
                </SC.StyledPlanetsPageMainBlock>
            </SC.StyledPlanetsInnerContainer>
            {Array.isArray(finalResults) && !!finalResults?.length && <Pagination previous={previous} next={next} nextPage={nextPage} previousPage={previousPage} />}
        </SC.StyledPlanetsContainer>
    )
};

export default Planets

import React, { FC } from 'react';
import { usePlanets } from './usePlanets';
import SinglePlanet from '../../components/SinglePlanet';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import Filter from '../../components/Filter';
import * as SC from './styles';

const Planets: FC = () => {
    const {
        next,
        isLoading,
        results,
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
                    {Array.isArray(results) && !!results?.length ? (
                        results.map(item => (
                            <SinglePlanet key={item.name} {...item} />
                        ))
                    ) : <div>Nothing found !!!</div>}
                </SC.StyledPlanetsPageMainBlock>
            </SC.StyledPlanetsInnerContainer>
            <Pagination previous={previous} next={next} nextPage={nextPage} previousPage={previousPage} />
        </SC.StyledPlanetsContainer>
    )
};

export default Planets

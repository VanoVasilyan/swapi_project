import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
        finalResults,
        previous,
        isFetching,
        filterItems,
        showFilters,
        nextPageLoading,
        showClearFilters,
        previousPageLoading,
        goBack,
        nextPage,
        previousPage,
        clearAllFilters,
        handleSelectChange,
    } = usePlanets();

    if (isFetching || nextPageLoading || previousPageLoading) {
        return <Loading $setMainBlockHeight $top='30%' $left='50%' $width='80px' $height='80px' />
    };

    return (
        <SC.StyledPlanetsContainer>
            <SC.StyledPlanetsInnerContainer>
                {showFilters && <SC.StyledFilterWrapper>
                    <SC.StyledFiltersHeader>
                        <SC.StyledFilterContainerTitle><FontAwesomeIcon icon={faFilter} /> Filters</SC.StyledFilterContainerTitle>
                        {showClearFilters &&
                            <SC.StyledClearFiltersButton onClick={clearAllFilters}>
                                <FontAwesomeIcon icon={faXmark} /> Clear filters
                            </SC.StyledClearFiltersButton>}
                    </SC.StyledFiltersHeader>
                    {filterItems.map(({ id, title, items }) => (<Filter key={id} title={title} data={items} onChange={handleSelectChange} />))}
                </SC.StyledFilterWrapper>}
                <SC.StyledPlanetsPageMainBlock>
                    {Array.isArray(finalResults) && !!finalResults?.length ? (
                        finalResults.map((result, ind) => (
                            <SinglePlanet key={ind} {...result} />
                        ))
                    ) : <NoResult text={`Nothing found${!showFilters ? '.' : ', please change filters.'}`} goBack={!showFilters ? goBack : null} />}
                </SC.StyledPlanetsPageMainBlock>
            </SC.StyledPlanetsInnerContainer>
            {(Array.isArray(finalResults) && !!finalResults?.length) && (previous || next) && <Pagination previous={previous} next={next} nextPage={nextPage} previousPage={previousPage} />}
        </SC.StyledPlanetsContainer>
    )
};

export default Planets

import React, { FC } from 'react';
import SinglePlanet from '../../components/SinglePlanet';
import Loading from '../../components/Loading';
import NoResult from '../../components/NoResult';
import Pagination from '../../components/Pagination';
import Filters from '../../components/Filters';
import Header from '../../components/Header';
import { usePlanets } from './usePlanets';
import * as SC from './styles';

const Planets: FC = () => {
    const {
        page,
        pageCount,
        finalResults,
        isFetching,
        filterItems,
        showFilters,
        showClearFilters,
        searchValue,
        goBack,
        clearAllFilters,
        handlePageChange,
        handleSelectChange,
        delayDebounceSearch,
    } = usePlanets();

    if (isFetching) {
        return <Loading $setMainBlockHeight $top='30%' $left='50%' $width='80px' $height='80px' />
    };

    return (
        <SC.StyledPlanetPageWrapper>
            <Header searchvalue={searchValue} delayDebounceSearch={delayDebounceSearch} />
            <SC.StyledPlanetsContainer>
                <SC.StyledPlanetsInnerContainer>
                    {showFilters && <Filters showClearFilters={showClearFilters} clearAllFilters={clearAllFilters} handleSelectChange={handleSelectChange} filterItems={filterItems}/>}
                    <SC.StyledPlanetsPageMainBlock>
                        {Array.isArray(finalResults) && !!finalResults?.length ? (
                            finalResults.map((result, ind) => (
                                <SinglePlanet key={ind} {...result} />
                            ))
                        ) : <NoResult text={`Nothing found${!showFilters ? '.' : ', please change filters.'}`} goBack={!showFilters ? goBack : null} />}
                    </SC.StyledPlanetsPageMainBlock>
                </SC.StyledPlanetsInnerContainer>
                {Array.isArray(finalResults) && !!finalResults?.length &&
                    <Pagination
                        pagesCount={pageCount}
                        currentPage={page}
                        setCurrentPage={handlePageChange}
                        clearAllFilters={clearAllFilters}
                    />}
            </SC.StyledPlanetsContainer>
        </SC.StyledPlanetPageWrapper>
    )
};

export default Planets

import React, { FC } from 'react';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Filters from '../../components/Filters';
import NoResult from '../../components/NoResult';
import Pagination from '../../components/Pagination';
import SingleFilm from '../../components/SingleFilm';
import { useFilms } from './useFilms';
import * as SC from './styles';

const Films: FC = () => {
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
    } = useFilms();

    if (isFetching) {
        return <Loading $setMainBlockHeight $top='30%' $left='50%' $width='80px' $height='80px' />
    };

    return (
        <SC.StyledFilmPageWrapper>
            <Header searchvalue={searchValue} delayDebounceSearch={delayDebounceSearch} />
            <SC.StyledFilmsContainer>
                <SC.StyledFilmsInnerContainer>
                    {showFilters && <Filters showClearFilters={showClearFilters} clearAllFilters={clearAllFilters} handleSelectChange={handleSelectChange} filterItems={filterItems}/>}
                    <SC.StyledFilmsPageMainBlock>
                        {Array.isArray(finalResults) && !!finalResults?.length ? (
                            finalResults.map((result, ind) => (
                                <SingleFilm key={ind} {...result} />
                            ))
                        ) : <NoResult text={`Nothing found${!showFilters ? '.' : ', please change filters.'}`} goBack={!showFilters ? goBack : null} />}
                    </SC.StyledFilmsPageMainBlock>
                </SC.StyledFilmsInnerContainer>
                {Array.isArray(finalResults) && !!finalResults?.length &&
                    <Pagination
                        pagesCount={pageCount}
                        currentPage={page}
                        setCurrentPage={handlePageChange}
                        clearAllFilters={clearAllFilters}
                    />}
            </SC.StyledFilmsContainer>
        </SC.StyledFilmPageWrapper>
    )
};

export default Films

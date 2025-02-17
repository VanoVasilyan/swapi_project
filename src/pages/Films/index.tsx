import React, { FC } from 'react';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Filters from '../../components/Filters';
import Button from '../../components/Button';
import NoResult from '../../components/NoResult';
import Pagination from '../../components/Pagination';
import SingleFilm from '../../components/SingleFilm';
import { createArrayOfObjectsFromProperties } from '../../utils/createArrayOfObjectsFromProperties';
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
        toggleTheme,
        clearAllFilters,
        handlePageChange,
        handleSelectChange,
        delayDebounceSearch,
    } = useFilms();

    if (isFetching) {
        return <Loading $setMainBlockHeight $width='80px' $height='80px' />
    };

    return (
        <SC.StyledFilmPageWrapper>
            <Header searchvalue={searchValue} delayDebounceSearch={delayDebounceSearch} />
            <SC.StyledFilmsContainer>
                <SC.StyledFilmsInnerContainer>
                    {showFilters && <Filters showClearFilters={showClearFilters} clearAllFilters={clearAllFilters} handleSelectChange={handleSelectChange} filterItems={filterItems} />}
                    <SC.StyledFilmsPageMainBlock>
                        {Array.isArray(finalResults) && !!finalResults?.length ? (
                            finalResults.map((result, ind) => (
                                <SingleFilm
                                    key={ind}
                                    characters={result.characters}
                                    planets={result.planets}
                                    starships={result.starships}
                                    vehicles={result.vehicles}
                                    species={result.species}
                                    filmDetails={createArrayOfObjectsFromProperties({...result, releaseDate: result?.releaseDate?.split('-')[0]})}
                                />
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
                <SC.StyledToggleThemeButtonWrapper>
                    <Button type='toggleTheme' onClick={toggleTheme} />
                </SC.StyledToggleThemeButtonWrapper>
            </SC.StyledFilmsContainer>
        </SC.StyledFilmPageWrapper>
    )
};

export default Films

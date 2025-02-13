import React, { FC } from 'react';
import Header from '../../components/Header';
import Filters from '../../components/Filters';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import SingleCharacter from '../../components/SingleCharacter';
import NoResult from '../../components/NoResult';
import Pagination from '../../components/Pagination';
import { createArrayOfObjectsFromProperties } from '../../utils/createArrayOfObjectsFromProperties';
import { useCharacters } from './useCharacters';
import * as SC from './styles';

const Characters: FC = () => {
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
    } = useCharacters();

    if (isFetching) {
        return <Loading $setMainBlockHeight $width='80px' $height='80px' />
    };

    return (
        <SC.StyledCharacterPageWrapper>
            <Header searchvalue={searchValue} delayDebounceSearch={delayDebounceSearch} />
            <SC.StyledCharactersContainer>
                <SC.StyledCharactersInnerContainer>
                    {showFilters && <Filters showClearFilters={showClearFilters} clearAllFilters={clearAllFilters} handleSelectChange={handleSelectChange} filterItems={filterItems} />}
                    <SC.StyledCharactersPageMainBlock>
                        {Array.isArray(finalResults) && !!finalResults?.length ? (
                            finalResults.map((result, ind) => (
                                <SingleCharacter
                                    key={ind}
                                    films={result.films}
                                    species={result.species}
                                    vehicles={result.vehicles}
                                    starships={result.starships}
                                    characterDetails={createArrayOfObjectsFromProperties(result)}
                                />
                            ))
                        ) : <NoResult text={`Nothing found${!showFilters ? '.' : ', please change filters.'}`} goBack={!showFilters ? goBack : null} />}
                    </SC.StyledCharactersPageMainBlock>
                </SC.StyledCharactersInnerContainer>
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
            </SC.StyledCharactersContainer>
        </SC.StyledCharacterPageWrapper>
    )
};

export default Characters

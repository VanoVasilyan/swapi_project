import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Filter from '../../components/Filter';
import SingleCharacter from '../../components/SingleCharacter';
import NoResult from '../../components/NoResult';
import Pagination from '../../components/Pagination';
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
        clearAllFilters,
        handlePageChange,
        handleSelectChange,
        delayDebounceSearch,
    } = useCharacters();

    if (isFetching) {
        return <Loading $setMainBlockHeight $top='30%' $left='50%' $width='80px' $height='80px' />
    };

    return (
        <SC.StyledCharacterPageWrapper>
            <Header searchvalue={searchValue} delayDebounceSearch={delayDebounceSearch} />
            <SC.StyledCharactersContainer>
                <SC.StyledCharactersInnerContainer>
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
                    <SC.StyledCharactersPageMainBlock>
                        {Array.isArray(finalResults) && !!finalResults?.length ? (
                            finalResults.map((result, ind) => (
                                <SingleCharacter key={ind} {...result} />
                            ))
                        ) : <NoResult text={`Nothing found${!showFilters ? '.' : ', please change filters.'}`} goBack={!showFilters ? goBack : null} />}
                    </SC.StyledCharactersPageMainBlock>
                </SC.StyledCharactersInnerContainer>
                {Array.isArray(finalResults) && !!finalResults?.length &&
                    <Pagination
                        pagesCount={pageCount}
                        currentPage={page}
                        setCurrentPage={handlePageChange}
                    />}
            </SC.StyledCharactersContainer>
        </SC.StyledCharacterPageWrapper>
    )
};

export default Characters

import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSearchBar } from './useSearchBar';
import Loading from '../Loading';
import * as SC from './styles';

const Search: FC = () => {
    const { isLoading, searchValue, handleChange } = useSearchBar();

    return (
        <SC.StyledSearchContainer>
            {isLoading ? <Loading $top='2px' $left='-5px' /> : <FontAwesomeIcon icon={faMagnifyingGlass} />}
            <SC.StyledSearchInput value={searchValue} onChange={handleChange} placeholder='Search ...' />
        </SC.StyledSearchContainer>
    )
};

export default Search

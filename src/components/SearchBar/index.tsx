import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { TSearch } from './types';
import * as SC from './styles';

const Search: FC<TSearch> = ({ delayDebounceSearch, searchvalue }) => {
    return (
        <SC.StyledSearchContainer>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <SC.StyledSearchInput value={searchvalue} onChange={delayDebounceSearch} placeholder='Search ...' />
        </SC.StyledSearchContainer>
    )
};

export default Search

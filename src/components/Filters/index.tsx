import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useGlobalThemeContext } from '../../context/theme';
import SingleFilter from './SingleFilter';
import { IFilters } from './types';
import * as SC from './styles';

const Filters: FC<IFilters> = ({ showClearFilters, filterItems, clearAllFilters, handleSelectChange }) => {
    const { theme, isDark } = useGlobalThemeContext();

    return (
        <SC.StyledFilterWrapper $isDark={isDark} $bgColor={theme.filter.background}>
            <SC.StyledFiltersHeader>
                <SC.StyledFilterContainerTitle $color={theme.filter.mainTitle}><FontAwesomeIcon icon={faFilter} /> Filters</SC.StyledFilterContainerTitle>
                {showClearFilters &&
                    <SC.StyledClearFiltersButton onClick={() => clearAllFilters()}>
                        <FontAwesomeIcon icon={faXmark} /> Clear filters
                    </SC.StyledClearFiltersButton>}
            </SC.StyledFiltersHeader>
            {filterItems.map(({ id, title, items }) => (
                <SingleFilter
                    key={id}
                    title={title}
                    data={items}
                    onChange={handleSelectChange}
                    titleColor={theme.filter.subTitle}
                    labelColor={theme.filter.text}
                />))}
        </SC.StyledFilterWrapper>
    )
};

export default Filters

import React from 'react';
import ReactPaginate from 'react-paginate';
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon';
import RightArrowIcon from '../../assets/icons/RightArrowIcon';
import { useGlobalThemeContext } from '../../context/theme';
import { IPaginationProps } from './types';
import * as SC from './styles';

const Pagination: React.FC<IPaginationProps> = ({
    pagesCount,
    currentPage = 1,
    setCurrentPage,
    clearAllFilters,
}) => {
    const { theme } = useGlobalThemeContext();
    const handleClick = ({ nextSelectedPage }: { nextSelectedPage?: number }): void => {
        if (nextSelectedPage || nextSelectedPage === 0) {
            setCurrentPage(nextSelectedPage + 1);
        };
        clearAllFilters(false);
    };

    return (
        <SC.StyledPagination
            $color={theme.pagination.color}
            $activeColor={theme.pagination.active.color}
            $activeBackground={theme.pagination.active.background}
            $hoverColor={theme.pagination.hover.color}
            $hoverBackgroundColor={theme.pagination.hover.background}
            $arrowColor={theme.pagination.arrow.color}
            $arrowHoverColor={theme.pagination.arrow.hover.color}
        >
            {pagesCount > 1 && (
                <ReactPaginate
                    previousLabel={<LeftArrowIcon />}
                    nextLabel={<RightArrowIcon />}
                    breakLabel="..."
                    pageCount={pagesCount}
                    initialPage={currentPage - 1}
                    activeClassName="active"
                    disabledClassName="disable"
                    onClick={handleClick}
                />
            )}
        </SC.StyledPagination>
    );
};

export default Pagination;

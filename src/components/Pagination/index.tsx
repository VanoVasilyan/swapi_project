import React from 'react';
import ReactPaginate from 'react-paginate';
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon';
import RightArrowIcon from '../../assets/icons/RightArrowIcon';
import { IPaginationProps } from './types';
import * as SC from './styles';

const Pagination: React.FC<IPaginationProps> = ({
    pagesCount,
    currentPage = 1,
    setCurrentPage,
}) => {
    const handleClick = ({ nextSelectedPage }: { nextSelectedPage?: number }): void => {
        if (nextSelectedPage || nextSelectedPage === 0) {
            setCurrentPage(nextSelectedPage + 1);
        }
    };

    return (
        <SC.StyledPagination>
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

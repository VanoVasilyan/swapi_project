import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { usePagination } from './usePagination';
import { IPagination } from './types';
import * as SC from './styles';

const Pagination: FC<IPagination> = ({ next, previous, previousPage, nextPage }) => {
    const { handleNextPage, handlePreviousPage } = usePagination({ next, previous, previousPage, nextPage });

    return (
        <SC.StyledPaginationContainer>
            <SC.StyledPaginationButton disabled={!previous}
                onClick={handlePreviousPage}><FontAwesomeIcon icon={faChevronLeft} />Previous</SC.StyledPaginationButton>
            <SC.StyledPaginationButton disabled={!next} onClick={handleNextPage}>Next<FontAwesomeIcon icon={faChevronRight} /></SC.StyledPaginationButton>
        </SC.StyledPaginationContainer>
    )
};

export default Pagination

import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { TNoResult } from './types';
import * as SC from './styles';

const NoResult: FC<TNoResult> = ({ text, goBack }) => {
    return (
        <SC.StyledNoResultContainer>
            <SC.StyledNoResultText>{text}</SC.StyledNoResultText>
            {goBack && <SC.StyledGoBackButton onClick={goBack}><FontAwesomeIcon icon={faArrowLeftLong}/>go back</SC.StyledGoBackButton>}
        </SC.StyledNoResultContainer>
    )
};

export default NoResult

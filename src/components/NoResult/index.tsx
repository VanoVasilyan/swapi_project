import React, { FC } from 'react';
import { TNoResult } from './types';
import * as SC from './styles';

const NoResult: FC<TNoResult> = ({ text }) => {
    return (
        <SC.StyledNoResultContainer>
            <SC.StyledNoResultText>{text}</SC.StyledNoResultText>
        </SC.StyledNoResultContainer>
    )
};

export default NoResult

import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useGlobalThemeContext } from '../../context/theme';
import { TNoResult } from './types';
import * as SC from './styles';

const NoResult: FC<TNoResult> = ({ text, goBack, errorFromRouter }) => {
    const navigate = useNavigate();
    const { theme } = useGlobalThemeContext();

    return (
        <SC.StyledNoResultContainer>
            <SC.StyledNoResultText $color={theme.noResult.color}>{text}</SC.StyledNoResultText>
            {goBack &&
                <SC.StyledGoBackButton $hoverColor={theme.noResult.goBack.hover.color} onClick={errorFromRouter ? () => navigate(errorFromRouter) : goBack}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />go back
                </SC.StyledGoBackButton>}
        </SC.StyledNoResultContainer>
    )
};

export default NoResult

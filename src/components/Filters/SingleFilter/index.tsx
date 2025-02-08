import React, { FC } from 'react';
import { ISingleFilter } from './types';
import * as SC from './styles';

const SingleFilter: FC<ISingleFilter> = ({ title, onChange, data, titleColor, labelColor }) => {
    return (
        <SC.StyledSingleFilterContainer>
            <SC.StyledSingleFilterTitle $color={titleColor}>{title.includes('_') ? title.replace('_', ' ') : title}</SC.StyledSingleFilterTitle>
            {data.map((check: string) =>
            (<SC.StyledCheckBoxLable key={check} $color={labelColor}>
                <SC.StyledCheckBox onChange={() => onChange(check, title)} />{check}
            </SC.StyledCheckBoxLable>)
            )}
        </SC.StyledSingleFilterContainer>
    )
};

export default SingleFilter

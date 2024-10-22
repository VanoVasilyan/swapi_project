import React, { FC } from 'react';
import { IFilter } from './types';
import * as SC from './styles';

const Filter: FC<IFilter> = ({ title, onChange, data }) => {
    return (
        <SC.StyledFilterContainer>
            <SC.StyledFilterTitle>{title}</SC.StyledFilterTitle>
            {data.map((check: string) =>
            (<SC.StyledCheckBoxLable key={check}>
                <SC.StyledCheckBox onChange={() => onChange(check, title)} />{check}
            </SC.StyledCheckBoxLable>)
            )}
        </SC.StyledFilterContainer>
    )
};

export default Filter

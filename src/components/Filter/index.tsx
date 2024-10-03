import React, { FC } from 'react';
import { IFilter } from './types';
import * as SC from './styles';

const Filter: FC<IFilter> = ({ title, onChange, data }) => {
    return (
        <SC.StyledFilterContainer>
            <SC.StyledFilterSelect onChange={onChange}>
                <SC.StyledFilterOption hidden>{title}</SC.StyledFilterOption>
                {data.map((item: string) => (
                    <SC.StyledFilterOption key={item} value={item}>{item}</SC.StyledFilterOption>
                ))}
            </SC.StyledFilterSelect>
        </SC.StyledFilterContainer>
    )
};

export default Filter

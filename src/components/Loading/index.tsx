import React, { FC } from 'react';
import { ILoading } from './types';
import * as SC from './styles';

const Loading: FC<ILoading> = ({ $top, $left, $width, $height }) => {
    return (
        <SC.StyledCircleMainBlock>
            <SC.StyledCircleContainer $top={$top} $left={$left} $width={$width} $height={$height} />
        </SC.StyledCircleMainBlock>
    )
};

export default Loading

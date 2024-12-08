import React, { FC } from 'react';
import { useGlobalThemeContext } from '../../context/theme';
import { ILoading } from './types';
import * as SC from './styles';

const Loading: FC<ILoading> = ({ $top, $left, $width, $height, $setMainBlockHeight }) => {
    const { theme } = useGlobalThemeContext();

    return (
        <SC.StyledCircleMainBlock $setMainBlockHeight={$setMainBlockHeight}>
            <SC.StyledCircleContainer $loaderColor={theme.loader.color} $top={$top} $left={$left} $width={$width} $height={$height} />
        </SC.StyledCircleMainBlock>
    )
};

export default Loading

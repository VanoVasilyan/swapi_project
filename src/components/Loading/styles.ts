import styled, { css } from 'styled-components';

export const StyledCircleMainBlock = styled.div<{ $setMainBlockHeight?: boolean }>`
    position: relative;
    ${({ $setMainBlockHeight }) => $setMainBlockHeight && css`height: 102vh;`}
`;

export const StyledCircleContainer = styled.div<{ $top?: string, $left?: string, $width?: string, $height?: string, $loaderColor?: string }>`
  position: absolute;
  top: ${({ $top }) => $top || '50%'};
  left: ${({ $left }) => $left || '50%'};
  transform: translate(-50%, -50%);

  width: ${({ $width }) => $width || '15px'};
  height: ${({ $height }) => $height || '15px'};
  border: solid 2px ${({ $loaderColor }) => $loaderColor || '#ffcc00'};
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;

  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to { 
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
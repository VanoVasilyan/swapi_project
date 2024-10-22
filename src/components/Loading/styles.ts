import styled, { css } from 'styled-components';

export const StyledCircleMainBlock = styled.div<{ $setMainBlockHeight?: boolean }>`
    position: relative;
    ${({ $setMainBlockHeight }) => $setMainBlockHeight && css`height: 102vh;`}
`

export const StyledCircleContainer = styled.div<{ $top?: string, $left?: string, $width?: string, $height?: string }>`
  position: absolute;
  width: ${({ $width }) => $width ? $width : '15px'};
  height: ${({ $height }) => $height ? $height : '15px'};
  ${({ $top }) => $top && css`top: ${$top}`};
  ${({ $left }) => $left && css`left: ${$left}`};
  border:solid 2px #A9A9A9;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  -webkit-transition: all 0.5s ease-in;		
  -webkit-animation-name: rotate; 
  -webkit-animation-duration: 1.0s; 
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;	
  transition: all 0.5s ease-in;
  animation-name: rotate; 
  animation-duration:1.0s; 
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
  

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to { 
        transform: rotate(360deg);
    }
   }
 
@-webkit-keyframes rotate {
    from {
        -webkit-transform: rotate(0deg);
    }
    to { 
        -webkit-transform: rotate(360deg);
    }
}
`
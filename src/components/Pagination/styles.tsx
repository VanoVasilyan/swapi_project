import { styled } from 'styled-components';

export const StyledPagination = styled.div<{
  $color: string,
  $activeColor: string,
  $activeBackground: string,
  $hoverColor: string,
  $hoverBackgroundColor: string,
  $arrowColor: string,
  $arrowHoverColor: string,
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  & ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    & li {
      width: 32px;
      height: 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${({ $color }) => $color};
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;

      @media all and (max-width: 375px) {
        width: 28px;
        height: 30px;
      }

      @media all and (max-width: 320px) {
        width: 25px;
      }

      @media all and (max-width: 300px) {
        width: 23px;
      }

      a {
        padding: 10px;
      }

      &:hover {
        color: ${({ $hoverColor }) => $hoverColor};
        background-color: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
      }

      &.active {
        color: ${({ $activeColor }) => $activeColor};
        background-color: ${({ $activeBackground }) => $activeBackground};
      }

      &.disable {
        pointer-events: none;
      }

      &:first-child {
        margin-right: 0px;
        padding: 0;
        width: auto;
        svg {
          path {
            fill: ${({ $arrowColor }) => $arrowColor};
          }
        }
        &:hover {
          background-color: transparent;
          svg {
            path {
              fill: ${({ $arrowHoverColor }) => $arrowHoverColor};
            }
          }
        }
      }
      &:last-child {
        margin-left: 0;
        width: auto;

        svg {
          path {
            fill:  ${({ $arrowColor }) => $arrowColor};
          }
        }
        &:hover {
          background-color: transparent;
          svg {
            path {
              fill: ${({ $arrowHoverColor }) => $arrowHoverColor};
            }
          }
        }
      }
    }
  }
`;
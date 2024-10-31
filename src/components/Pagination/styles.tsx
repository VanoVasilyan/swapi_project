import { styled } from 'styled-components';

export const StyledPagination = styled.div`
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
      color: #9996BA;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;

      @media all and (max-width: 330px) {
        width: 29px;
        height: 30px;
      }

      a {
        padding: 10px;
      }

      &:hover {
        color: #6D6AE0;
        background-color: #F1EFFF;
      }

      &.active {
        color: #6D6AE0;
        background-color: #F1EFFF;
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
            fill: #A1A0AE;
          }
        }
        &:hover {
          background-color: transparent;
          svg {
            path {
              fill: #6D6AE0;
            }
          }
        }
      }
      &:last-child {
        margin-left: 0;
        width: auto;

        svg {
          path {
            fill: #A1A0AE;
          }
        }
        &:hover {
          background-color: transparent;
          svg {
            path {
              fill: #6D6AE0;
            }
          }
        }
      }
    }
  }
`;

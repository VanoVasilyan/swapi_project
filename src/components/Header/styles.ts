import styled from 'styled-components';

export const StyledHeaderMainBlock = styled.header`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    transition: top 0.5s ease;
    align-items: center;
    background-color: #6D6AE0;
    padding: 10px 20px;

    @media (max-width: 550px){
       flex-direction: column;
       align-items: start;
       gap: 15px;
    }
`;

export const StyledSearchBlock = styled.div`
    @media (max-width: 550px){
       width: 100%;
       max-width: 285px;
    }
`;

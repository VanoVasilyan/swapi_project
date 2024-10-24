import styled from 'styled-components';

export const StyledHeaderMainBlock = styled.div`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    transition: top 0.5s ease;
    align-items: center;
    background-color: #333B7E;
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

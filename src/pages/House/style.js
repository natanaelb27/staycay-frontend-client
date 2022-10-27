import styled from 'styled-components';

export const MainContainer = styled.div`
    max-width: 100%;
    align-content: center; 
    place-items: center; 
    padding-left: 15%;
    padding-right: 15%; 


    @media (max-width: 500px) {
        padding: 0.5rem;
    }
`;

export const HouseTitleContainer = styled.div`
    width: 100%;
    margin-top: 3%;
`;

export const HouseImageContainer = styled.div`
    height: 40rem;
    margin-top: 3%;
`;

export const HouseContentContainer = styled.div`
    margin-top: 3%;
`;

export const HouseContentDetailsContainer = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    padding: 3%;

    @media (max-width: 1420px) {
        display: block;
    }
`;

export const Line = styled.div`
    border-bottom: 0.2px solid #C5C5C5;
    width: 90%;

    @media (max-width: 1024px) {
        width: 100%;
    }
`;

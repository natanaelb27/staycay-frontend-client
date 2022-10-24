import styled from 'styled-components';
import { FaChevronLeft } from 'react-icons/fa';

export const MainContainer = styled.div`
    max-width: 100%;
    align-content: center; 
    place-items: center; 
    padding-left: 15%;
    padding-right: 15%; 

    @media (max-width: 500px) {
        padding: 0;
    }
`;

export const TitleContainer = styled.div`
    display: flex; 
    align-items: center;
    margin-top: 1%;
`;

export const BackIcon = styled(FaChevronLeft)`
    width: 5rem;
    cursor: pointer; 
`;

export const Title = styled.h1`
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 
    width: 50rem;

    @media (max-width: 420px) {
        line-height: 2rem; 
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

export const ImagesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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

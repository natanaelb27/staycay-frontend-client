import styled from 'styled-components';
import { FaChevronLeft } from 'react-icons/fa';

export const MainContainer = styled.div`
    max-width: 100%;
    align-content: center;
    place-items: center;
    padding-left: 15%;
    padding-right: 15%; 
    margin-top: 1%;
    margin-bottom: 1%;

    @media (max-width: 500px) {
        padding: 0.5rem;
    }
`;

export const TitleContainer = styled.div`
    display: flex; 
    align-items: center;
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

export const ReservationContentContainer = styled.div`
    max-width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 40% 60%;
    justify-items: center;
    margin-top: 1.5rem;
    gap: 8rem;

    @media (max-width: 1000px){
        grid-template-columns: 100%;
        gap: 2rem;
    }
`;

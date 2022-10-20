import styled from 'styled-components';
import { FaChevronLeft } from 'react-icons/fa';

export const MainContainer = styled.div`
    max-width: 100%;
    align-content: center; 
    place-items: center; 
    padding-left: 15%;
    padding-right: 15%; 
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
`;

export const ReservationContentContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
`;

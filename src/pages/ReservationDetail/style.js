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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    gap: 1rem;
    border:  1px solid black;
    border-radius: 2rem;

`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    gap: 1rem;

    @media (max-width: 591px) {
        display: grid;
        justify-content: center;
    }

/* 
    @media (max-width: 300px) {
        display: grid;
        justify-content: center;
    } */
`;

export const QRContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    gap: 1rem;
`;

export const SpanTitle = styled.span`
    display: block;
    font-size: 0.95rem;
    font-weight: 700; 
    letter-spacing: 0.025em; 
`;

export const SpanDetail = styled.span`
    display: block;
    font-size: 0.95rem;
    letter-spacing: 0.025em; 
    color: #3C4048;
    text-align: center;
`;

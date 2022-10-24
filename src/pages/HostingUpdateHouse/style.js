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
    padding: 3rem;
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

export const LabelImage = styled.label`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dotted black;
    border-radius: 1rem;
    width: 10rem;
    height: 10rem;
    cursor: pointer;
    font-size: large;
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: underline;
    text-align: center;
    padding: 3rem;

    @media (max-width: 260px){
        width: 100%;
        height: 10rem;
        padding: 0rem;
    }
`;

export const InputImage = styled.input`
    display: none;
`;

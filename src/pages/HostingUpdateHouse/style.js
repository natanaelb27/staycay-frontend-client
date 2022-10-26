import styled from 'styled-components';
import { FaChevronLeft } from 'react-icons/fa';

export const MainContainer = styled.div`
    max-width: 100%;
    align-content: center; 
    place-items: center; 
    padding-left: 15%;
    padding-right: 15%; 
    margin-top: 2%;

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

export const ContentContainer = styled.div`
    width: 100%;
`;

export const HouseImageContainer = styled.div`
    margin-top: 3%;
    display: grid;
    justify-items: center;
    gap: 1rem;
`;

export const HouseContentContainer = styled.div`
    margin-top: 2%;
`;

export const HouseContentDetailsContainer = styled.div`
    display: grid;
    gap: 1rem;

`;

export const LabelImage = styled.label`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dotted black;
    border-radius: 1rem;
    cursor: pointer;
    
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: underline;
    text-align: center;
    width: 100%;
    height: 5rem;

    @media (max-width: 260px){
        width: 100%;
        height: 10rem;
        padding: 0rem;
    }
`;

export const NewPhotoButtonContainer = styled.div`
    width: 50%;
`;

export const InputImage = styled.input`
    display: none;
`;

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* grid-template-columns: 1fr 1fr 1fr; */
    overflow: auto;
    overflow-y: scroll;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    height: 21rem;
`;

export const OuterImageContainer = styled.div`
    display: grid;
    justify-items: center;
    width: 100%;
`;

export const SpanTitle = styled.span`
    display: block;
    font-size: 0.95rem;
    font-weight: 700; 
    letter-spacing: 0.025em; 
`;

export const SpanDetail = styled.span`
    display: block;
    font-size: 1rem;
    letter-spacing: 0.025em; 
    color: #3C4048;
`;

export const HouseStatusContainer = styled.div`
    display: flex; 
    width: 50%;
    gap: 0.5rem;

    @media (max-width: 900px) {
        flex-direction: column;
        width: 100%;
        gap: 0rem;
    }
   
`;

export const ButtonContainer = styled.div`
    display: flex; 
    gap: 1rem;

    @media (max-width: 500px) {
        flex-direction: column;
    } 
`;

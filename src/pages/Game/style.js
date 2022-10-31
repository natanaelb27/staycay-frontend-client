import styled from 'styled-components';

export const MainContainer = styled.div`
    max-width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
    padding-top: 3%;
    padding-bottom: 3%;
    padding-left: 30%;
    padding-right: 30%;
    margin-top: 2rem;

    @media (max-width: 500px) {
        padding: 0.5rem;
    }
`;

export const GameContainer = styled.div`
    max-width: 100%;
    align-content: center; 
    place-items: center; 
    padding-top: 5%;
    padding-bottom: 5%;
    padding-left: 15%;
    padding-right: 15%; 
    display: grid;
    gap: 0.5rem;

    border: 1px solid black;
    border-radius: 2rem;
    box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.5);    

`;

export const LoadingContainer = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    margin-top: 0.5rem;
`;

export const Title = styled.h1`
    font-weight: 700; 
    letter-spacing: 0.025em; 
    text-align: center;
    color: #56261a;

`;

export const TitleContent = styled.span`
    font-weight: 700; 
    font-size: 1.5rem;
    letter-spacing: 0.025em; 
    text-align: center;

`;

export const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
`;

export const ButtonSelection = styled.button`
    background-color: #f3c70d;
    color: #56261a;
    padding-top: 5%;
    padding-bottom: 5%;
    padding-left: 10%;
    padding-right: 10%;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    text-align: center;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: #f5d23d;
    }

    &:disabled {
        cursor: default;
        background-color: #cccccc;
        color: black;
    }
`;

export const TextContainer = styled.div`
    display: grid;
    gap: 1rem;
`;

export const TextContentContainer = styled.div`
    display: flex;
    gap: 0.2rem;
`;

export const SpanTitle = styled.span`
    display: block;
    font-size: 0.95rem;
    font-weight: 700; 
    letter-spacing: 0.025em; 
    text-align: center;
`;

export const SpanDetail = styled.span`
    display: block;
    font-size: 0.95rem;
    letter-spacing: 0.025em; 
    color: #3C4048;
    text-align: center;
`;

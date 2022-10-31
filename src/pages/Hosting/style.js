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

export const Container = styled.div`
    display: grid;
    gap: 1rem;
`;

export const BecomeHostContainer = styled.div`
    max-width: 100%;
    display: grid;
    place-items: center; 
    justify-items: center;
    align-items: center;
    padding-left: 15%;
    padding-right: 15%;

    @media (max-width: 500px) {
        padding: 0.5rem;
    }
`;

export const BecomeHostTitle = styled.h1`
    font-size: 9vw;
    text-align: center;
`;

export const BecomeHostButton = styled.button`
    background-color: black;
    color: white;
    font-weight: bold;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    border-color: transparent;
    font-size: 3vw;
    /* font-size: 2rem; */

    &:hover {
        background-color: #3C4048;
    }

    @media (max-width: 700px) {
        /* font-size: 1rem; */
    }
    @media (max-width: 450px) {
        /* font-size: 1rem; */
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }

`;

import styled from 'styled-components';

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

export const Container = styled.div`
    display: grid;
    gap: 1rem;
`;

export const ProfileContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 1000px){
        display: block;
    }
`;

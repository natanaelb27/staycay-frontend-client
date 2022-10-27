import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: fit-content;
    margin-top: 3%;
`;

export const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

export const AddNewHouseButtonContainer = styled.div`
    width: 50%;
    margin-left: auto; 
    margin-right: 0;

    @media (max-width: 700px) {
        margin-left: auto; 
        margin-right: auto;
    }
`;

export const Title = styled.h1`
    padding-left: 2%;
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 

    @media (max-width: 950px) {
        line-height: 2rem; 
    }

    @media (max-width: 700px) {
        text-align: center;
    }
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 2rem;
    row-gap: 5rem;
    margin-top: 3rem;

    @media (max-width: 350px) {
        grid-template-columns: 1fr;
    }
`;

export const PaginationContainer = styled.div`
    display: grid;
    justify-content: center;
    padding: 2%;
`;

import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    height: fit-content;
    margin-top: 3%;
`;

export const Title = styled.h1`
    padding-left: 2%;
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 

    @media (max-width: 500px) {
        text-align: center;
    }

`;

export const MaxSelectionContainer = styled.div`
    display: flex;
    padding: 1rem;
    justify-content: space-evenly;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const MinSelectionContainer = styled.div`
    display: none;
    padding: 1rem;

    @media (max-width: 768px) {
        display: grid;
    }
`;

export const SpanSelection = styled.span`
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.025em;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    &.active {
        text-decoration: underline;
    }
`;

export const SpanDetail = styled.span`
    display: block;
    font-size: 0.95rem;
    letter-spacing: 0.025em; 
    color: #3C4048;
`;

export const ReservationContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;

`;

export const NoDataContainer = styled.div`
    display: grid;
    margin-top: 1rem    ;
    justify-items: center;
    align-items: center;
`;

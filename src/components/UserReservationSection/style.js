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
`;

export const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
    padding: 1rem;
    justify-items: center;
    gap: 0.3rem;
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
    display: grid;
    gap: 1rem;
    justify-content: center;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

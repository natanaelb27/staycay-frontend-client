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

export const ContentContainer = styled.div`
    display: grid;
    padding: 1rem;
    gap: 0.5rem;
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
`;

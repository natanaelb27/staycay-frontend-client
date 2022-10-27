import styled from 'styled-components';

export const FooterContainer = styled.div`
    display: grid;
    margin-top: 2rem;
    position: relative;
    bottom: 0;
    background-color: var(--staycay-red);
    padding: 1.25rem;
    padding-left: 10%;
    padding-right: 10%;
    justify-content: center;
    gap: 3rem;
    @media (max-width: 768px) {
        gap: 1rem;
    }
`;

export const FooterTitle = styled.h1`
    color: white;
    text-align: center;
`;

export const MainContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ContentContainer = styled.div`
    display: grid;
    grid-template-rows: 10% 90%;
    gap: 1rem;

    @media (max-width: 768px) {
        padding-bottom: 2rem;
        border-bottom: 1px solid white;
    }
`;

export const Content = styled.div`
    display: grid;
    gap: 0.5rem;
`;

export const SpanTitle = styled.span`
    display: block;
    font-size: 1.1rem;
    font-weight: 700; 
    color: white;
`;

export const SpanDetail = styled.span`
    display: block;
    font-size: 1rem;
    font-weight: 300; 
    color: white;
`;

export const CopyrightContent = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
`;

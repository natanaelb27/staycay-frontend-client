import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    gap: 1rem;
    margin-left: 3rem;

    @media (max-width: 1000px){
        margin-left: 0;
    }
`;

export const Title = styled.h2`
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 
    width: 50%;

    @media (max-width: 1000px) {
        width: 100%;
        line-height: 2rem; 
        text-align: center;
    }
`;

export const ContentContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 30% 70%;

    @media (max-width: 1000px){
        width: 100%;
    }

`;

export const ContentTitle = styled.span`
    color: #222222;
    font-weight: bold;
`;

export const ContentSpan = styled.span`
    color: #222222;

    @media (max-width: 1000px){
        text-align: right;
    }
`;

export const RemainingBalanceSpan = styled.span`
    color: ${(props) => (props.isNotEnough === 'true' ? 'var(--staycay-red)' : '#222222')};

    @media (max-width: 1000px){
        text-align: right;
    }
`;

export const ButtonContainer = styled.div`
    width: 50%;

    @media (max-width: 1000px){
        width: 100%;
    }
`;

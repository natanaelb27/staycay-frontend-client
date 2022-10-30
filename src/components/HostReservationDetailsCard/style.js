import styled from 'styled-components';

export const MainContainer = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: #eee;
    border-radius: 1rem;
    padding: 1rem;
    cursor: pointer;
    box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.5);
`;

export const DivContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 3fr;
    gap: 0.5rem;
    align-items: center;
    justify-items: center;
    padding: 1rem;
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-items: center;

    @media (max-width: 1400px) {
        grid-template-columns: 1fr;
        gap: 2rem;
        justify-items: center;
    }

    @media (max-width: 1100px) {
        grid-template-columns: 1fr 2fr;
        align-items: center;
    }
    
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        gap: 2rem;
        justify-items: center;
    }
`;

export const ContentContainer = styled.div`
    display: grid;
    gap: 0.5rem;
    margin-left: 1rem;

`;

export const ContentDetailContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.5rem;
    align-items: center;
`;

export const HouseImage = styled.div`
    background-image: ${(props) => (props.imgSrc ? props.imgSrc : null)};;
    background-size: cover;
    width: 10rem;
    height: 9rem;
    border-radius: 1rem;
    
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

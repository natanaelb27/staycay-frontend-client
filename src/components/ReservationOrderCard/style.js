import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid rgb(221, 221, 221); 
    width: 100%;
    height: 100%;
    border-radius: 12px; 
    padding: 3rem; 
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    display: grid;
    grid-template-columns: 100%;
    gap: 1rem;
    box-sizing: border-box;
`;

export const HouseImageContainer = styled.div`
    display: grid;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const HouseImage = styled.div`
    background-image: ${(props) => (props.imgSrc ? props.imgSrc : null)};;
    background-size: cover;
    width: 10rem;
    height: 9rem;
    border-radius: 1rem;
    ;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    
`;

export const HouseDetailContent = styled.div`
    display: grid;
    grid-template-rows: 50% 50%;
    align-items: center;
    gap: 1rem;

    @media (max-width: 1300px) {
        margin-top: 1rem;        
    }
`;

export const SpanTitle = styled.span`
    /* color: #222222;
    font-weight: bold;
    font-size: 1.25rem;
    height: fit-content; */

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

export const PriceContainer = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 420px) {
        flex-direction: column;
    }
    /* grid-template-columns: 50% 50%; */
    
`;

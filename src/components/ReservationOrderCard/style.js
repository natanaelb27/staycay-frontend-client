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

    @media (max-width: 1300px) {
        grid-template-rows: 60% 40%;
    }
`;

export const HouseDetailContainer = styled.div`
    display: flex;
    align-content: center;
    height: 100%;
    gap: 2rem;

    @media (max-width: 1300px) {
        height: fit-content;
        display: block;
    }

`;

export const HouseImageContainer = styled.div`
    display: grid;
    height: 100%;
    align-items: center;

    @media (max-width: 1300px) {
        justify-content: center;
        height: fit-content;
    }
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
    display: grid;
    width: 100%;
    grid-template-rows: 1fr 1fr;
    gap: 0.2rem;
    
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

export const HouseDetailContentContainer = styled.div`
    display: grid;
    align-items: center;
`;

export const TripMainContainer = styled.div`
    display: grid;
    gap: 1rem;
`;

export const TripDetailContainer = styled.div`
    display: grid;
    gap: 0.2rem;
    height: fit-content;
    /* display: flex;
    flex-direction: column; */
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
    /* grid-template-columns: 50% 50%; */
    
`;

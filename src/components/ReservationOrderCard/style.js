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
        grid-template-rows: 60% 20% 20%;
    }
`;

export const HouseDetailContainer = styled.div`
    display: flex;
    align-content: center;
    gap: 2rem;

    @media (max-width: 1300px) {
       display: block;
    }

`;

export const HouseImageContainer = styled.div`
    display: grid;
    align-items: center;

    @media (max-width: 1300px) {
        justify-content: center;
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

export const HouseDetailContent = styled.div`
    display: grid;
    grid-template-rows: 50% 50%;
    align-items: center;
    gap: 0rem;

    @media (max-width: 1300px) {
        margin-top: 0.25rem;        
    }
`;

export const Span = styled.span`
    color: #222222;
    font-size: 1rem;
`;

export const TripDetailContainer = styled.div`
    display: grid;
    grid-template-rows: 40% 60%;
    /* display: flex;
    flex-direction: column; */
`;

export const ContentTitle = styled.h1`
    color: #222222;
    font-weight: bold;
    font-size: 1.25rem;
    height: fit-content;
`;

export const PriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    /* grid-template-columns: 50% 50%; */
    
`;

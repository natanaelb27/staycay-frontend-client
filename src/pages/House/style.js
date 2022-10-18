import styled from 'styled-components';

export const HouseTitleContainer = styled.div`
    width: 100%;
    margin-top: 3%;
`;

export const HouseImageContainer = styled.div`
    height: 40rem;
    margin-top: 3%;
`;

export const HouseContentContainer = styled.div`
    margin-top: 3%;
`;

export const HouseContentDetailsContainer = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;

    @media (max-width: 1024px) {
        display: block;
    }
`;

export const Line = styled.div`
    border-bottom: 0.2px solid #C5C5C5;
    width: 90%;

    @media (max-width: 1024px) {
        width: 100%;
    }
`;

export const ReservationCard = styled.div`
    border: 1px solid rgb(221, 221, 221); 
    border-radius: 12px; 
    padding: 24px; 
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

export const BoldSpan = styled.span`
    color: #222222;
    font-weight: bold;
    font-size: 1rem;

`;

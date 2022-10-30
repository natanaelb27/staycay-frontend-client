import styled from 'styled-components';

export const ReservationContainer = styled.div`
    border: 1px solid rgb(221, 221, 221); 
    border-radius: 12px; 
    padding: 24px; 
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;
`;

export const BoldSpan = styled.span`
    color: #222222;
    font-weight: bold;
    font-size: 1rem;
`;

export const DateRangeContainer = styled.div`
    display: grid;
    gap: 0.2rem;
`;

export const DateRangeHeader = styled.div`
    display: flex;
`;

export const DateRangeSpan = styled.span`
    color: #222222;
    font-weight: bold;
    text-align: center;
    flex: 1 1;
    font-size: 1rem;
`;

export const PriceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    gap: 3%;
`;

export const PriceSpan = styled.span`
    font-weight: normal;
`;

export const TotalPriceContainer = styled.div`
    display: grid;
    justify-content: right;
`;

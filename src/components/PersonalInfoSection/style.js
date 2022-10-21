import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    margin-top: 3%;
`;

export const Title = styled.h1`
    padding-left: 2%;
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 
`;

export const ContentDetailContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
`;

export const PersonalInfoContainer = styled.div`
    display: grid;
    align-items: center;
    gap: 0.3rem;
`;

export const EditButtonContainer = styled.div`
    display: grid;
    align-items: start;
    justify-items: right;
`;

export const EditButton = styled.button`
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
    border: none;
    background: none;
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

export const EditContainer = styled.div`
    display: grid;
    /* grid-template-rows: 1fr 0.5fr; */
`;

export const EditTwoInputsContainer = styled.div`
    display: grid;
    gap: 1rem;
`;

export const SaveButtonContainer = styled.div`
    margin-top: 1rem;
    width: 50%;
`;

export const SecondContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 2fr;
    gap: 0.2rem;
`;

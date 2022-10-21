import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    background-color: #eee;
    border-radius: 1rem;
    padding: 1rem;
    width: fit-content;
    cursor: pointer;
`;

export const ContentContainer = styled.div`
    display: grid;
`;

export const ContentDetailContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
`;

export const HouseImage = styled.div`
    background-image: ${(props) => (props.imgSrc ? props.imgSrc : null)};;
    background-size: cover;
    width: 10rem;
    height: 9rem;
    border-radius: 1rem;
    ;
`;

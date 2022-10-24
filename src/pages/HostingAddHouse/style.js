import styled from 'styled-components';

export const MainContainer = styled.div`
    max-width: 100%;
    align-content: center; 
    place-items: center; 
    padding-left: 15%;
    padding-right: 15%; 

    @media (max-width: 500px) {
        padding: 0;
    }
`;

export const Container = styled.div`
    margin-top: 3%;
`;

export const LabelImage = styled.label`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dotted black;
    border-radius: 1rem;
    width: 10rem;
    height: 10rem;
    cursor: pointer;
    font-size: large;
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: underline;
    padding: 3rem;
`;

export const InputImage = styled.input`
    display: none;
`;

export const ImagesContainer = styled.div`
`;

export const ImageContainer = styled.div`
`;

export const Image = styled.img`
    height: 200px;
`;

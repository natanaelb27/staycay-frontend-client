import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaChevronLeft } from 'react-icons/fa';

export const MainContainer = styled.div`
    max-width: 100%;
    align-content: center; 
    place-items: center; 
    padding-left: 15%;
    padding-right: 15%; 
    margin-top: 1%;
    margin-bottom: 1%;

    @media (max-width: 500px) {
        padding: 0.5rem;
    }
`;

export const TitleContainer = styled.div`
    display: flex; 
    align-items: center;
    margin-top: 1%;
`;

export const BackIcon = styled(FaChevronLeft)`
    width: 5rem;
    cursor: pointer; 
`;

export const Title = styled.h1`
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 
    width: 50rem;

    @media (max-width: 420px) {
        line-height: 2rem; 
    }
`;

export const Container = styled.div`
    display: grid;
    gap: 0.5rem;
`;

export const SmallContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.5fr 1fr;
    gap: 1rem;

    @media (max-width: 768px){
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
`;

export const LabelImage = styled.label`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dotted black;
    border-radius: 1rem;
    cursor: pointer;
    
    font-size: large;
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: underline;
    text-align: center;
    width: 100%;
    height: 5rem;

    @media (max-width: 260px){
        width: 100%;
        height: 10rem;
        padding: 0rem;
    }
`;

export const InputImage = styled.input`
    display: none;
`;

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: auto;
    overflow-y: scroll;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    height: 21rem;
    margin-top: 2%;
`;

export const HousePhotoContainer = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
`;

export const ImageContainer = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
`;

export const ImageContentContainer = styled.div`
    display: grid;
`;

export const Image = styled.div`
    background-size: cover;
    background-image: ${(props) => (props.imgSrc ? props.imgSrc : null)};
    width: 20rem;
    height: 20rem;
    border-radius: 20px;
    border: 0.1px solid gray;

    @media (max-width: 340px) { 
        width: 100%;
        height: 20rem;
    }
`;

export const DeleteImageContainer = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    margin-top: 1rem;

    font-size: 0.75rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    padding: 3%;
    border-radius: 20px;
    user-select: none;
    
    @media (min-width: 768px) { 
        margin-top: 0;
    }
`;

export const DeleteImageContentContainer = styled.div`
    display: flex; 
    padding-top: 0.5rem;
    padding-bottom: 0.5rem; 
    align-items: center; 
    cursor: pointer;
    border-radius: 9999px; 
    box-shadow: 1px 0px 3px 0 rgba(0,0,0,0.5);
    background-color: white;

    &:hover {
        background-color: #F3F4F6; 
    }

    @media (min-width: 768px) { 
        border-width: 2px; 
    }
`;

export const InputSpan = styled.span`
    padding-left: 1.25rem; 
    background-color: transparent; 
    flex-grow: 1; 
    border: 0;
    outline: none; 
    color: #374151; 
    font-size: 0.75rem;
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 
    text-transform: uppercase; 

`;

export const Icon = styled(FontAwesomeIcon)`
    padding: 0.5rem; 
    background-color: var(--staycay-red);
    color: #ffffff; 
    height: 1rem; 
    border-radius: 9999px; 
    cursor: pointer; 
    display: inline-flex; 
    margin-left: 0.5rem;
    margin-right: 0.5rem; 

`;

export const ButtonContainer = styled.div`
    display: grid;
    justify-items: center;
    margin-top: 2%;
`;

export const ButtonContentContainer = styled.div`
    display: grid;
    justify-items: center;
    width: 50%;

`;

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MainContainer = styled.div`
    margin: 0px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Image = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: ${(props) => (props.imgSrc ? props.imgSrc : null)};

    width: 20rem;
    height: 20rem;
    border: 0.1px solid gray;
    border-radius: 20px;

`;

export const DeleteImageContainer = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    margin-top: 1rem;

    opacity: ${(props) => (props.ishover === 'true' ? '100%' : '0%')};
    transition: opacity 0.4s ease-in-out;
    position: absolute;
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

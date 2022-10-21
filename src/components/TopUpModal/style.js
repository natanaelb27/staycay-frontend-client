import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0;
    transition: all 0.3s ease-in-out;
    pointer-events: none;

    /* transform: translateY(-100%);
    transition: all 0.3s ease-in-out; */

    &.show {
        opacity: 1;
        pointer-events: visible;

        /* transform: translateY(0); */
    }
`;

export const ModalContent = styled.div`
    width: 50%;
    background-color: #fff;

    transform: translateY(-100%);
    transition: all 0.3s ease-in-out;

    &.show {
        /* opacity: 1;
        pointer-events: visible; */

        transform: translateY(0);
    }
`;

export const ModalHeader = styled.div`
    padding: 1rem;
    display: grid;
    justify-content: center;
`;

export const ModalTitle = styled.h1`
    margin: 0;
`;

export const ModalBody = styled.div`
    padding: 1rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: grid;
    justify-content: center;
`;

export const ModalFooter = styled.div`
    padding: 1rem;
    display: grid;
    justify-content: center;
    grid-template-columns: 10rem 10rem;
    gap: 1rem;

    @media (max-width: 700px){
        grid-template-columns: 100%;
        
    }

`;

export const Container = styled.div`
    width: 100%;
`;

export const ContentContainer = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
`;

export const AmountButtonContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    /* display: flex;
    flex-direction: column; */
    align-content: center;
    gap: 1rem;
`;

export const Icon = styled(FontAwesomeIcon)`
    padding: 0.5rem; 
    background-color: var(--staycay-red);
    color: #ffffff; 
    height: 1rem; 
    border-radius: 9999px; 
    cursor: pointer; 

    @media (min-width: 768px) { 
        display: inline-flex; 
        margin-left: 0.5rem;
        margin-right: 0.5rem; 
    }
`;

export const AmountSpan = styled.span`
    padding-right: 1.25rem; 
    text-align: center;
    background-color: transparent; 
    flex-grow: 1; 
    border: 0;
    outline: none; 
    color: #374151; 
    font-size: 0.75rem;
    line-height: 1rem; 
    font-weight: 700; 
    letter-spacing: 0.025em; 
`;

export const AmountButton = styled.button`
    width: 100%;
    display: flex; 
    padding-top: 0.5rem;
    padding-bottom: 0.5rem; 
    grid-column: span 2 / span 2;
    align-items: center; 
    cursor: pointer;
    border: 0.5px solid #ccc;
    background-color: transparent; 
    border-radius: 9999px; 

    @media (max-width: 1200px){
        grid-column: span 3 / span 3;
    }

    @media (max-width: 700px){
        grid-column: span 6 / span 6;
    }

    &:hover {
        border: 0.5px solid #307831;
        background-color: #e9ffea; 
    }

    &:focus {
        border: 1px solid #307831;
        background-color: #e9ffea; 
    }

    
`;

export const InputContainer = styled.div`
    display: grid;
    width: 95%;
`;

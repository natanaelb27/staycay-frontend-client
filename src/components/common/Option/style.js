import styled from 'styled-components';

export const Options = styled.option`
    display: block; 
    padding-top: 0.75rem;
    padding-bottom: 0.75rem; 
    padding-left: 1rem;
    padding-right: 1rem; 
    padding: 0.5rem;
    background-color: #ffffff; 
    color: #374151; 
    line-height: 1.25; 
    width: 100%; 
    border-radius: 0.25rem; 
    border-width: 1px; 
    border: 1px solid #374151;
    appearance: none; 

    &:focus{
        background-color: #ffffff; 
        border: 1px solid #374151;
        outline: 0; 
    }
`;

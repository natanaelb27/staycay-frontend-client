import styled from 'styled-components';

export const Options = styled.option`
    display: block; 
    padding-top: 0.75rem;
    padding-bottom: 0.75rem; 
    padding-left: 1rem;
    padding-right: 1rem; 
    background-color: #E5E7EB; 
    color: #374151; 
    line-height: 1.25; 
    width: 100%; 
    border-radius: 0.25rem; 
    border-width: 1px; 
    border-color: #E5E7EB; 
    appearance: none; 

    &:focus{
        background-color: #ffffff; 
        border-color: #6B7280; 
        outline: 0; 
    }
`;

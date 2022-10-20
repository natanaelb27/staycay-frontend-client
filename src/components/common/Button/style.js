import styled from 'styled-components';

export const Buttons = styled.button`
    width: 100%;
    background-color: var(--staycay-red);
    color: white;
    font-weight: bold;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    border-color: transparent;

    &:hover {
        background-color: var(--staycay-light-red);
    }

    :disabled {
        cursor: default;
        background-color: gray;
    }
`;

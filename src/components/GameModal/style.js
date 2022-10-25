import styled from 'styled-components';

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
    z-index: 10;

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
    width: fit-content;
    padding: 2rem;
    background-color: #fff;

    transform: translateY(-100%);
    transition: all 0.3s ease-in-out;

    &.show {
        /* opacity: 1;
        pointer-events: visible; */

        transform: translateY(0);
    }

    @media (max-width: 500px) {
        width: 100%;
    }
`;

// export const ModalHeader = styled.div`
//     padding: 1rem;
//     display: grid;
//     justify-content: center;
// `;

// export const ModalTitle = styled.h1`
//     margin: 0;
// `;

export const ModalBody = styled.div`
    padding: 1rem;
    display: grid;
    justify-content: center;
`;

export const ContentContainer = styled.div`
    display: grid;
`;

export const Title = styled.h1`
    text-align: center;
`;

export const ContentText = styled.h2`
    text-align: center;
    font-weight: normal;
`;

export const ModalFooter = styled.div`
    padding: 1rem;
    display: grid;
    justify-content: center;

`;

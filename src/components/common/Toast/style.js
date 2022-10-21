import styled from 'styled-components';

export const MainContainer = styled.div`
    position: fixed;
    left: 0;
    top: 1rem;
    right: 0;
    display: grid; 
    justify-content: center; 
`;

export const ToastContainer = styled.div`
    display: flex; 
    align-items: center;
    justify-content: center;
    padding: 1rem; 
    background-color: ${(props) => (props.isSucc.toString() === 'true' ? 'var(--staycay-success)' : 'var(--staycay-red)')};
    color: white; 
    width: 100%; 
    border-radius: 0.5rem; 
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); 
`;

export const ToastContent = styled.div`
    margin-right: 0.25rem; 
    font-size: 0.875rem;
    line-height: 1.25rem; 
    font-weight: 400; 
`;

export const CloseButton = styled.button`
    display: inline-flex; 
    align-items: center;
    justify-content: center;
    padding: 0.25rem; 
    width: 2rem; 
    height: 2rem; 
    border: none;
    background-color: transparent; 
    color: white; 

    &:hover {
        color: #111827; 
    }


`;

export const CloseSVG = styled.svg`
    width: 1.25rem; 
    height: 1.25rem; 

`;

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const InfoContainer = styled.div`
    display: flex;
    align-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-weight: normal;
    text-decoration: none;
`;

export const InfoMessages = styled.p`
    margin: 0;
    font-size: 0.75rem;
    color: var(--blue);
`;

export const InfoIcon = styled(FontAwesomeIcon)`
    color: var(--blue);
`;

import styled from 'styled-components';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export const HouseContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
`;

export const Slider = styled.div`
    /* width: 18rem;
    height: 18rem; */
    border-radius: 20px;    
    margin: 0px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LeftArrow = styled(FaChevronLeft)`
    opacity: ${(props) => (props.ishover === 'true' ? '100%' : '0%')};
    transition: opacity 0.2s ease-in-out;
    position: absolute;
    left: 5%;
    font-size: 0.75rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    padding: 3%;
    border-radius: 20px;
    background-color: white;
    user-select: none;
`;

export const RightArrow = styled(FaChevronRight)`
    opacity: ${(props) => (props.ishover === 'true' ? '100%' : '0%')};
    transition: opacity 0.2s ease-in-out;
    position: absolute;
    right: 5%;
    font-size: 0.75rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    padding: 3%;
    border-radius: 20px;
    background-color: white;
    user-select: none;
`;

export const Image = styled.div`
    background-size: cover;
    background-image: ${(props) => (props.imgSrc ? props.imgSrc : null)};

    width: 60rem;
    height: 40rem;
    border-radius: 20px;
    border: 0.1px solid gray;
`;

export const Slide = styled.div`
    opacity: 0;
    transition-duration: 1s ease;

    &.active {
        opacity: 1;
        animation: slide-in 0.5s forwards;
        transition-duration: 1s;
    }
`;

import styled from 'styled-components';

// export const ImageDiv = styled.div`
//     background-image: ${(props) => `url(${props.img})`};
// `;

export const Wrapper = styled.div`
    height: 20rem;
    width: 20rem;
    border-radius: 20px;
    background-size: cover;
    background-image: ${(props) => (props.img ? `url(${props.img})` : null)};
`;

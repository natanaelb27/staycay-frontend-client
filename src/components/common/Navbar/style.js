import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    padding-left: 0.5rem;
    padding-right: 0.5rem; 
    padding-top: 0.625rem;
    padding-bottom: 0.625rem; 
    border-bottom: 10px;
    /* border-bottom: 0.2px solid gray; */

    @media (min-width: 640px) { 
        padding-left: 2.5rem;
        padding-right: 2.5rem; 
    }
`;

export const Container = styled.div`
    width: 100%; 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-between; 
    align-items: center; 
`;

export const LogoLink = styled(Link)`
    display: flex; 
    align-items: center; 

    @media (max-width: 640px) { 
        display: none;
    }
`;

export const Logo = styled.img`
    width: 70%;
`;

export const DropDownMenu = styled.div`
    float: left;
    overflow: hidden;
`;

export const IconButton = styled.button`
    display: inline-flex; 
    gap: 0.75rem;
    padding: 0.75rem; 
    margin-left: 0.75rem; 
    background-color: white;
    font-size: 0.875rem;
    line-height: 1.25rem; 
    align-items: center; 
    border-radius: 1.25rem; 

    @media (max-width: 640px) { 
        display: none;
    }

    &:hover {
        background-color: #F3F4F6; 
    }
`;

export const IconFilter = styled.button`
    display: inline-flex; 
    gap: 0.5rem;
    padding: 0.75rem; 
    margin-left: 0.75rem; 
    background-color: white;
    font-size: 0.875rem;
    line-height: 1.25rem; 
    align-items: center; 
    border-radius: 1.25rem; 

    &:hover {
        background-color: #F3F4F6; 
    }
`;

export const NavMenu = styled.div`
    display: ${(props) => (props.open ? 'block' : 'none')};
    width: 100%;
`;

export const NavMenuList = styled.ul`
    position: absolute;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 0.5rem;
    z-index: 1;
    border-radius: 1rem;
    right: 3rem;
`;

export const NavMenuLink = styled(Link)`
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
`;

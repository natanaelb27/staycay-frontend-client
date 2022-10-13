import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  IconButton,
  IconFilter,
  Nav,
  Logo,
  LogoLink,
  DropDownMenu,
  NavMenu,
  NavMenuList,
  NavMenuLink,
} from './style';

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Nav>
      <Container>
        <LogoLink to="/" replace>
          <Logo src={require('../../../assets/staycay-logo-name.png')} alt="staycay-logo" />
        </LogoLink>
        <IconFilter type="button">
          <FontAwesomeIcon icon={faFilter} />
          <span>Filter</span>
        </IconFilter>
        <DropDownMenu>
          <IconButton type="button" onClick={handleOpenMenu}>
            <FontAwesomeIcon icon={faBars} />
            <FontAwesomeIcon icon={faUser} />
          </IconButton>
          <NavMenu open={openMenu}>
            <NavMenuList>
              <NavMenuLink to="/login">
                Login
              </NavMenuLink>
              <NavMenuLink to="/register">
                Register
              </NavMenuLink>
              <NavMenuLink to="/profile">
                Profile
              </NavMenuLink>
              <NavMenuLink to="/hosting">
                Become a host / Manage your houses
              </NavMenuLink>
              <NavMenuLink to="/">
                Logout
              </NavMenuLink>
            </NavMenuList>
          </NavMenu>
        </DropDownMenu>
      </Container>
    </Nav>
  );
}

export default Navbar;

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

  const handleLogout = () => {
    setOpenMenu(!openMenu);
    localStorage.clear();
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
              {
                !localStorage.getItem('user') ? (
                  <>
                    <NavMenuLink to="/login" onClick={handleOpenMenu}>
                      Login
                    </NavMenuLink>
                    <NavMenuLink to="/register" onClick={handleOpenMenu}>
                      Register
                    </NavMenuLink>
                  </>
                )
                  : (
                    <NavMenuLink to="/" onClick={handleLogout}>
                      Logout
                    </NavMenuLink>
                  )
              }

              <NavMenuLink to="/profile" onClick={handleOpenMenu}>
                Profile
              </NavMenuLink>
              <NavMenuLink to="/hosting" onClick={handleOpenMenu}>
                Become a host / Manage your houses
              </NavMenuLink>

            </NavMenuList>
          </NavMenu>
        </DropDownMenu>
      </Container>
    </Nav>
  );
}

export default Navbar;

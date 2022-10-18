import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faBars, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  IconButton,
  InputSearch,
  // IconFilter,
  Nav,
  Logo,
  LogoLink,
  DropDownMenu,
  NavMenu,
  NavMenuList,
  NavMenuLink,
  SearchContainer,
  SearchIcon,
  DropdownContainer,
  MainSearchContainer,
} from './style';
import { useGetCityQuery } from '../../../store/slices/apiSlice';
import { setSearchHouse } from '../../../store/slices/searchHouseSlice';

function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [inputSearchHouse, setInputSearchHouse] = useState('');
  const dispatch = useDispatch();

  const {
    data: cityData,
    error: cityError,
    isLoading: cityLoading,
  } = useGetCityQuery();

  const [searchFocus, setSearchFocus] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    setOpenMenu(!openMenu);
    localStorage.clear();
  };

  const handleInputChange = (e) => {
    setInputSearchHouse(e.target.value);
  };

  const handleSearchFocus = () => {
    setSearchFocus(true);
    console.log(cityData?.data.city);
  };

  const handleSearchFocusOut = () => {
    setSearchFocus(false);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchHouse(inputSearchHouse));
    navigate('/');
  };

  const useOutsideAlerterDropdownMenu = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenMenu(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperDropdownMenuRef = useRef(null);
  useOutsideAlerterDropdownMenu(wrapperDropdownMenuRef);

  const useOutsideAlerterSearchMenu = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleSearchFocusOut();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperSearchMenuRef = useRef(null);
  useOutsideAlerterSearchMenu(wrapperSearchMenuRef);

  const renderCitiesDropdown = () => {
    cityData?.data.city.map((item) => (
      <option value={item.city_id}>{item.city_name}</option>
    ));
  };

  return (
    <Nav ref={wrapperSearchMenuRef}>
      <Container>
        <LogoLink onClick={handleSearchFocusOut} to="/" replace>
          <Logo src={require('../../../assets/staycay-logo-name.png')} alt="staycay-logo" />
        </LogoLink>
        <SearchContainer>
          <InputSearch type="text" placeholder="Search" value={inputSearchHouse} onChange={handleInputChange} onFocus={handleSearchFocus} />
          <SearchIcon icon={faSearch} onClick={handleClickSearch} />
        </SearchContainer>
        {/* <IconFilter type="button">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </IconFilter> */}
        <DropDownMenu ref={wrapperDropdownMenuRef}>
          <DropdownContainer>
            <IconButton type="button" onClick={handleOpenMenu}>
              <FontAwesomeIcon icon={faBars} />
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </DropdownContainer>
          <NavMenu open={openMenu} onClick={handleSearchFocusOut}>
            <NavMenuList>
              <NavMenuLink to="/" onClick={handleOpenMenu}>
                Home
              </NavMenuLink>
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

      <MainSearchContainer>
        <div>
          <select name="cities" id="cities" defaultValue={0}>
            <option value={0} disabled>Choose one...</option>
            {!cityLoading && !cityError && (renderCitiesDropdown())}
          </select>
        </div>
      </MainSearchContainer>
      {searchFocus
        ? (
          <MainSearchContainer>
            <div>
              <select name="cities" id="cities" defaultValue={0}>
                <option value={0} disabled>Choose one...</option>
                {!cityLoading && !cityError && (renderCitiesDropdown())}
              </select>
            </div>
          </MainSearchContainer>
        )

        : null}
    </Nav>
  );
}

export default Navbar;

import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faUser, faSearch, faFilter,
} from '@fortawesome/free-solid-svg-icons';
// import { faBars, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Container,
  IconButton,
  InputSpan,
  // IconFilter,
  Nav,
  Logo,
  LogoLink,
  DropDownMenu,
  NavMenu,
  NavMenuList,
  NavMenuLink,
  SearchContainer,
  FilterContainer,
  FilterIcon,
  FilterSpan,
  // SearchIcon,
  SearchButton,
  DropdownContainer,
  MainSearchContainer,
  ContentSearchContainer,
  ButtonSearchContainer,
  InputSearch,
  Label,
  Select,
} from './style';
import { useGetCityQuery } from '../../../store/slices/apiSlice';
import {
  setFilterHouse,
} from '../../../store/slices/filterHouseSlice';

function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const [inputFilter, setInputFilter] = useState({
    house: '', city: '0', checkInDate: '', checkOutDate: '',
  });

  const formatDate = 'YYYY-MM-DD';

  const today = moment().format(formatDate);

  const dispatch = useDispatch();

  const {
    data: cityData,
    error: cityError,
    isLoading: cityLoading,
  } = useGetCityQuery();

  const [searchMenu, setSearchMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    setOpenMenu(!openMenu);
    localStorage.clear();
  };

  const handleInputChange = (e) => {
    setInputFilter({ ...inputFilter, [e.target.name]: e.target.value });
  };

  const handleClearInput = () => {
    setInputFilter({
      house: '', city: '0', checkInDate: '', checkOutDate: '',
    });
  };

  const handleSearchMenu = () => {
    setSearchMenu(!searchMenu);
  };

  const handleSearchMenuOut = () => {
    setSearchMenu(false);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();

    dispatch(setFilterHouse({
      houseName: inputFilter.house,
      city: inputFilter.city,
      checkInDate: inputFilter.checkInDate,
      checkOutDate: inputFilter.checkOutDate,
    }));

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
          setSearchMenu(false);
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

  const renderCitiesDropdown = () => cityData?.data.city.map((item) => (
    <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
  ));

  return (
    <Nav ref={wrapperSearchMenuRef}>
      <Container>
        <LogoLink onClick={handleSearchMenuOut} to="/" replace>
          <Logo src={require('../../../assets/staycay-logo-name.png')} alt="staycay-logo" />
        </LogoLink>

        <FilterContainer type="button" onClick={handleSearchMenu}>
          <FilterIcon icon={faFilter} />
          <FilterSpan>Filter</FilterSpan>
        </FilterContainer>

        {/* <SearchContainer onClick={handleSearchMenu}>
          <InputSpan>Search</InputSpan>
          <FontAwesomeIcon icon={faFilter} />
        </SearchContainer> */}
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
          <NavMenu open={openMenu} onClick={handleSearchMenuOut}>
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
        {/* <div>
          <select name="cities" id="cities" defaultValue={0}>
            <option value={0} disabled>Choose one...</option>
            {!cityLoading && !cityError && (renderCitiesDropdown())}
          </select>
        </div> */}
      </MainSearchContainer>
      {searchMenu
        ? (
          <div>
            <MainSearchContainer>
              <ContentSearchContainer>
                <Label htmlFor="city">Choose City</Label>
                <Select name="city" id="city" onChange={handleInputChange} value={inputFilter.city}>
                  <option value="0">All</option>
                  {!cityLoading && !cityError && (renderCitiesDropdown())}
                </Select>
              </ContentSearchContainer>
              <ContentSearchContainer>
                <Label htmlFor="houseName">House Name</Label>
                <InputSearch id="houseName" onChange={handleInputChange} name="house" value={inputFilter.house} placeholder="Search house name" />
              </ContentSearchContainer>
              <ContentSearchContainer>
                <Label htmlFor="checkInDate">Check In Date</Label>
                <InputSearch type="date" id="checkInDate" onChange={handleInputChange} name="checkInDate" value={inputFilter.checkInDate} min={today} max={inputFilter.checkOutDate ? moment(inputFilter.checkOutDate).subtract(1, 'days').format(formatDate) : null} />
              </ContentSearchContainer>
              <ContentSearchContainer>
                <Label htmlFor="checkOutDate">Check Out Date</Label>
                <InputSearch type="date" id="checkOutDate" onChange={handleInputChange} name="checkOutDate" value={inputFilter.checkOutDate} min={inputFilter.checkInDate ? moment(inputFilter.checkInDate).add(1, 'days').format(formatDate) : today} />
              </ContentSearchContainer>
              <ButtonSearchContainer>
                <SearchContainer onClick={handleClickSearch}>
                  <InputSpan>Search</InputSpan>
                  <SearchButton icon={faSearch} />
                </SearchContainer>
              </ButtonSearchContainer>
            </MainSearchContainer>
            <button type="button" onClick={handleClearInput}>clear filter</button>
          </div>
        )

        : null}
    </Nav>
  );
}

export default Navbar;

import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faUser, faSearch, faFilter, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
// import { faBars, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Container,
  DropdownIcon,
  InputSpan,
  Nav,
  Logo,
  LogoLink,
  DropDownMenu,
  NavMenu,
  NavMenuList,
  NavMenuLink,
  FilterContainer,
  // FilterIcon,
  FilterSpan,
  Icon,
  DropdownContainer,
  MainSearchContainer,
  MainContentSearchContainer,
  SearchFooterContainer,
  SearchContainer,
  ClearFilterContainer,
  ClearFilterContentContainer,
  ContentSearchContainer,
  ButtonSearchContainer,
  // Input,
  // Label,
} from './style';
import Select from '../Select';
import Label from '../Label';
import Input from '../Input';
import { useGetCityQuery, useGetUserProfileQuery } from '../../../store/slices/apiSlice';
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

    console.log(inputFilter);

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

  const
    { data: userData } = useGetUserProfileQuery(undefined, { skip: localStorage.getItem('user') === null });

  const CheckUserRole = () => {
    if (localStorage.getItem('user')) {
      if (userData?.data.role === 'host') {
        return 'host';
      }

      return 'user';
    }
    return '';
  };

  return (
    <Nav ref={wrapperSearchMenuRef}>
      <Container>
        <LogoLink onClick={handleSearchMenuOut} to="/" replace>
          <Logo src={require('../../../assets/staycay-logo-name.png')} alt="staycay-logo" />
        </LogoLink>
        <FilterContainer type="button" onClick={handleSearchMenu}>
          <Icon icon={faFilter} />
          <FilterSpan>Filter</FilterSpan>
        </FilterContainer>
        <DropDownMenu ref={wrapperDropdownMenuRef}>
          <DropdownContainer>
            <DropdownIcon onClick={handleOpenMenu}>
              <FontAwesomeIcon icon={faBars} />
              <FontAwesomeIcon icon={faUser} />
            </DropdownIcon>
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
                  : null
              }
              {
                !localStorage.getItem('user') ? null
                  : (
                    <NavMenuLink to="/profile" onClick={handleOpenMenu}>
                      Profile
                    </NavMenuLink>
                  )
              }
              {
                localStorage.getItem('user') === null ? null : (CheckUserRole() === 'host'
                  ? (
                    <NavMenuLink to="/hosting">
                      Switch to hosting
                    </NavMenuLink>
                  ) : (
                    <NavMenuLink to="/hosting">
                      Become a host
                    </NavMenuLink>

                  )
                )
              }
              {
                !localStorage.getItem('user') ? null
                  : (
                    <NavMenuLink to="/" onClick={handleLogout}>
                      Logout
                    </NavMenuLink>
                  )
              }
            </NavMenuList>
          </NavMenu>
        </DropDownMenu>
      </Container>

      {searchMenu
        ? (
          <MainSearchContainer>
            <MainContentSearchContainer>
              <ContentSearchContainer>
                <Label labelFor="city">Choose City</Label>
                <Select selectName="city" selectID="city" handleChange={handleInputChange} selectValue={inputFilter.city}>
                  <option value="0">All</option>
                  {!cityLoading && !cityError && (renderCitiesDropdown())}
                </Select>
              </ContentSearchContainer>
              <ContentSearchContainer>
                <Label labelFor="houseName">House Name</Label>
                <Input inputType="text" inputID="houseName" handleChange={handleInputChange} inputName="house" inputValue={inputFilter.house} inputPlaceholder="Search house name" />
              </ContentSearchContainer>
              <ContentSearchContainer>
                <Label labelFor="checkInDate">Check In Date</Label>
                <Input inputType="date" inputID="checkInDate" handleChange={handleInputChange} inputName="checkInDate" inputValue={inputFilter.checkInDate} inputMin={today} inputMax={inputFilter.checkOutDate ? moment(inputFilter.checkOutDate).subtract(1, 'days').format(formatDate) : null} />
              </ContentSearchContainer>
              <ContentSearchContainer>
                <Label labelFor="checkOutDate">Check Out Date</Label>
                <Input inputType="date" inputID="checkOutDate" handleChange={handleInputChange} inputName="checkOutDate" inputValue={inputFilter.checkOutDate} inputMin={inputFilter.checkInDate ? moment(inputFilter.checkInDate).add(1, 'days').format(formatDate) : today} />
              </ContentSearchContainer>
            </MainContentSearchContainer>
            <SearchFooterContainer>
              <ClearFilterContainer>
                <ClearFilterContentContainer onClick={handleClearInput}>
                  <InputSpan>Clear Filter</InputSpan>
                  <Icon icon={faTrashAlt} />
                </ClearFilterContentContainer>
              </ClearFilterContainer>
              <ButtonSearchContainer>
                <SearchContainer onClick={handleClickSearch}>
                  <InputSpan>Search</InputSpan>
                  <Icon icon={faSearch} />
                </SearchContainer>
              </ButtonSearchContainer>
            </SearchFooterContainer>
          </MainSearchContainer>
        )

        : null}
    </Nav>
  );
}

export default Navbar;

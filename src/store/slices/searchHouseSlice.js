import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchHouse: '',
};

export const searchHouseSlice = createSlice({
  name: 'SearchHouse',
  initialState,
  reducers: {
    setSearchHouse: (state, action) => ({ ...state, searchHouse: action.payload }),
  },
});

export const { setSearchHouse } = searchHouseSlice.actions;
export default searchHouseSlice.reducer;

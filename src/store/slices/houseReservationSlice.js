import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  houseID: 0,
  checkInDate: '',
  checkOutDate: '',
};

export const houseReservationSlice = createSlice({
  name: 'HouseReservation',
  initialState,
  reducers: {
    setHouseReservation: (state, action) => ({
      ...state,
      houseID: action.payload.houseID,
      checkInDate: action.payload.checkInDate,
      checkOutDate: action.payload.checkOutDate,
    }),
  },
});

export const {
  setHouseReservation,
} = houseReservationSlice.actions;
export default houseReservationSlice.reducer;

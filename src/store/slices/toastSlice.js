import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topUpIsSuccess: false,
  topUpMessage: '',
  addReservationIsSuccess: false,
  addReservationMessage: '',
};

export const toastSlice = createSlice({
  name: 'Toast',
  initialState,
  reducers: {
    setToast: (state, action) => ({
      ...state,
      topUpIsSuccess: action.payload.topUpIsSuccess,
      topUpMessage: action.payload.topUpMessage,
      addReservationIsSuccess: action.payload.addReservationIsSuccess,
      addReservationMessage: action.payload.addReservationMessage,
    }),
  },
});

export const {
  setToast,
} = toastSlice.actions;
export default toastSlice.reducer;

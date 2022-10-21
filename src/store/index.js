import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import filterHouseReducer from './slices/filterHouseSlice';
import houseReservationReducer from './slices/houseReservationSlice';
import toastReducer from './slices/toastSlice';

const store = configureStore({
  reducer: {
    FilterHouse: filterHouseReducer,
    HouseReservation: houseReservationReducer,
    Toast: toastReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    apiSlice.middleware,
  ),
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import filterHouseReducer from './slices/filterHouseSlice';
import houseReservationReducer from './slices/houseReservationSlice';

const store = configureStore({
  reducer: {
    FilterHouse: filterHouseReducer,
    HouseReservation: houseReservationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    apiSlice.middleware,
  ),
});

export default store;

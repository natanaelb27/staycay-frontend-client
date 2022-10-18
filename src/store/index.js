import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import searchHouseReducer from './slices/searchHouseSlice';

const store = configureStore({
  reducer: {
    SearchHouse: searchHouseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    apiSlice.middleware,
  ),
});

export default store;

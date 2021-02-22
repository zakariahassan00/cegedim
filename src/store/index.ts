import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import timeSlotsSlice from './timeSlots';

const rootReducer = combineReducers({ timeSlots: timeSlotsSlice.reducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;

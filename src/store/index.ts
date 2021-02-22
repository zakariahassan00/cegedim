import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import timeslotsSlice from './timeslots';

const rootReducer = combineReducers({ timeslots: timeslotsSlice.reducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;

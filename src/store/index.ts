import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import timeslotsSlice from './timeslots';

const rootReducer = combineReducers({ timeslots: timeslotsSlice.reducer });

export default configureStore({
  reducer: rootReducer,
});

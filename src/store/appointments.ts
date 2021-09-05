import { Appointment } from '@prisma/client';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import config from 'config';
import { parseIds } from 'store/utils';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOING', '/api');

export const getAppointments = createAsyncThunk('getAppointments', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment[];
});

export const setNewAppontement = createAsyncThunk(
  'setAppointment',
  async (appointment: Appointment) => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`, {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Appointment;
  },
);

export const editAppontement = createAsyncThunk(
  'editAppointment',
  async (appointment: Appointment) => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`, {
      method: 'PUT',
      body: JSON.stringify(appointment),
    });
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Appointment;
  },
);

export const deleteAppontement = createAsyncThunk(
  'deleteAppointment',
  async (appointment: Appointment) => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`, {
      method: 'DELETE',
      body: JSON.stringify(appointment),
    });
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Appointment;
  },
);

const appointmentsAdapter = createEntityAdapter<Appointment>({});

export const appointmentsSelectors = appointmentsAdapter.getSelectors();

const appointmentsSlice = createSlice({
  name: 'timeslots',
  initialState: appointmentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      appointmentsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // set
    builder.addCase(setNewAppontement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setNewAppontement.fulfilled, (state, action) => {
      appointmentsAdapter.addOne(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(setNewAppontement.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // edit
    builder.addCase(editAppontement.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(editAppontement.fulfilled, (state, { payload }) => {
      appointmentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload,
      });
      state.error = null;
      state.loading = false;
    });
    builder.addCase(editAppontement.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    // delete
    builder.addCase(deleteAppontement.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteAppontement.fulfilled, (state, { payload }) => {
      appointmentsAdapter.removeOne(state, payload.id);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteAppontement.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default appointmentsSlice;

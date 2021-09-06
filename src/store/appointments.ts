import { Appointment } from '@prisma/client';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import config from 'config';
import { parseIds } from 'store/utils';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOING', '/api');

function createAction(type, method) {
  return createAsyncThunk(type, async (appointment: Appointment) => {
    const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`, {
      method: method,
      body: JSON.stringify(appointment),
    });
    const parsedResponse = await response.json();
    return parseIds(parsedResponse) as Appointment;
  });
}

export const getAppointments = createAsyncThunk('getAppointments', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment[];
});
export const setNewAppontement = createAction('setAppointment', 'POST');
export const editAppontement = createAction('editAppointment', 'PUT');
export const deleteAppontement = createAction('deleteAppointment', 'DELETE');

const appointmentsAdapter = createEntityAdapter<Appointment>({});
export const appointmentsSelectors = appointmentsAdapter.getSelectors();

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: appointmentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    [
      getAppointments,
      setNewAppontement,
      editAppontement,
      deleteAppontement,
    ].forEach((action) =>
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      }),
    );
    [
      getAppointments,
      setNewAppontement,
      editAppontement,
      deleteAppontement,
    ].forEach((action) =>
      builder.addCase(action.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      }),
    );
    // Read
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      appointmentsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    // Create
    builder.addCase(setNewAppontement.fulfilled, (state, action) => {
      appointmentsAdapter.addOne(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    // Update
    builder.addCase(editAppontement.fulfilled, (state, { payload }) => {
      appointmentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload,
      });
      state.error = null;
      state.loading = false;
    });
    // Delete
    builder.addCase(deleteAppontement.fulfilled, (state, { payload }) => {
      appointmentsAdapter.removeOne(state, payload.id);
      state.error = null;
      state.loading = false;
    });
  },
});

export default appointmentsSlice;

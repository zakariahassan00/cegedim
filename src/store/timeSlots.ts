import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const getTimeSlots = createAsyncThunk("getTimeSlots", async () => {
  const response = await fetch("/api/timeslots").then((res) => res.json());
  return response.data;
});

const timeSlotsAdapter = createEntityAdapter<any>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const timeSlotsSelectors = timeSlotsAdapter.getSelectors();

const timeSlotsSlice = createSlice({
  name: "timeSlots",
  initialState: timeSlotsAdapter.getInitialState({
    loading: "idle",
    error: null,
    ids: ["a", "b", "c", "d"],
    entities: {
      a: {
        id: "a",
        startDate: new Date(2021, 2, 6, 15, 55, 0).toISOString(),
        endDate: new Date(2021, 2, 6, 16, 10, 0).toISOString(),
      },
      b: {
        id: "b",
        startDate: new Date(2021, 2, 6, 16, 55, 0).toISOString(),
        endDate: new Date(2021, 2, 6, 16, 55, 0).toISOString(),
      },
      c: {
        id: "c",
        startDate: new Date(2021, 2, 6, 17, 55, 0).toISOString(),
        endDate: new Date(2021, 2, 6, 17, 55, 0).toISOString(),
      },
      d: {
        id: "d",
        startDate: new Date(2021, 2, 6, 15, 25, 0).toISOString(),
        endDate: new Date(2021, 2, 6, 15, 40, 0).toISOString(),
      },
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimeSlots.fulfilled, (state, action) => {
      timeSlotsAdapter.setAll(state, action.payload);
    });
    builder.addCase(getTimeSlots.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default timeSlotsSlice;

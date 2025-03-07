import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "filter",
  initialState: {},
  reducers: {
    updateSort: (state, action) => {
      return state = action.payload
    },
    resetSort: (state) => {
      state = {};
      return state;
    },
  },
});

export const { updateSort, resetSort } = sortSlice.actions;
export default sortSlice.reducer;

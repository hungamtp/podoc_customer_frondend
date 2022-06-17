import { createSlice } from "@reduxjs/toolkit";

const initialState = ["white"];

export const selectedColorsSlice = createSlice({
  name: "selectedColors",
  initialState,
  reducers: {
    setColors: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setColors } = selectedColorsSlice.actions;

export default selectedColorsSlice.reducer;

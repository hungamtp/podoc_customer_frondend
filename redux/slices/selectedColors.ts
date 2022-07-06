import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const selectedColorsSlice = createSlice({
  name: "selectedColors",
  initialState,
  reducers: {
    setColors: (state, action) => {
      return action.payload;
    },
    resetColors: () => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setColors, resetColors } = selectedColorsSlice.actions;

export default selectedColorsSlice.reducer;

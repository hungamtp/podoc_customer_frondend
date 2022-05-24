import { createSlice } from "@reduxjs/toolkit";

export interface DesignControlData {
  controlData: { isChooseImage: boolean; isSetImage: boolean };
}

const initialState: DesignControlData = {
  controlData: {
    isChooseImage: false,
    isSetImage: false,
  },
};

export const designControlSlice = createSlice({
  name: "designControl",
  initialState,
  reducers: {
    setControlData: (state, action) => {
      console.log(action, "actionnnn");
      return { controlData: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setControlData } = designControlSlice.actions;

export default designControlSlice.reducer;

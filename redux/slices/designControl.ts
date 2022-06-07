import { Blueprint } from "@/models/design/blueprint";
import { createSlice } from "@reduxjs/toolkit";

export interface DesignControlData {
  controlData: {
    isChooseImage: boolean;
    isSetImage: boolean;
    isEmpty: boolean;
  };
}

const initialState: DesignControlData = {
  controlData: {
    isChooseImage: false,
    isSetImage: false,
    isEmpty: true,
  },
};

export const designControlSlice = createSlice({
  name: "designControl",
  initialState,
  reducers: {
    setControlData: (state, action) => {
      return {
        controlData: {
          ...state.controlData,
          isChooseImage: action.payload.isChooseImage,
          isSetImage: action.payload.isSetImage,
          isEmpty: action.payload.isEmpty,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setControlData } = designControlSlice.actions;

export default designControlSlice.reducer;

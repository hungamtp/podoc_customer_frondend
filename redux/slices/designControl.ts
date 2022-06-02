import { Blueprint } from "@/models/blueprint";
import { createSlice } from "@reduxjs/toolkit";

export interface DesignControlData {
  controlData: {
    isChooseImage: boolean;
    isSetImage: boolean;
    renderedBlueprint: Blueprint;
  };
}

const initialState: DesignControlData = {
  controlData: {
    isChooseImage: false,
    isSetImage: false,
    renderedBlueprint: {
      frame_image:
        "https://media.coolmate.me/cdn-cgi/image/quality=80/uploads/March2022/6-0_55.jpg",
      position: "font",
      placeHolder: {
        width: 4500,
        height: 5100,
      },
    },
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
        },
      };
    },
    setBlueprint: (state, action) => {
      return {
        controlData: {
          ...state.controlData,
          renderedBlueprint: action.payload.renderedBlueprint,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setControlData, setBlueprint } = designControlSlice.actions;

export default designControlSlice.reducer;

import { Blueprint } from "@/models/design/blueprint";
import { createSlice } from "@reduxjs/toolkit";

export interface DesignControlData {
  controlData: {
    isChooseImage: boolean;
    isSetImage: boolean;
    isEmpty: boolean;
    isLoadingImage: boolean;
  };
}

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

const initialState: DesignControlData = {
  controlData: {
    isChooseImage: false,
    isSetImage: false,
    isEmpty: true,
    isLoadingImage: false,
  },
};

export const designControlSlice = createSlice({
  name: "designControl",
  initialState,
  reducers: {
    setControlData: (state, action) => {
      return {
        controlData: {
          isChooseImage: action.payload.isChooseImage,
          isSetImage: action.payload.isSetImage,
          isEmpty: action.payload.isEmpty,
          isLoadingImage: action.payload.isLoadingImage,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setControlData } = designControlSlice.actions;

export default designControlSlice.reducer;

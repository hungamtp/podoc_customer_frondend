import { Blueprint } from "@/models/design/blueprint";
import { createSlice } from "@reduxjs/toolkit";

export interface HeaderInfoData {
  productName: string;
  factoryName: string;
}

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

const initialState: HeaderInfoData = {
  productName: "Áo thun châu Á",
  factoryName: "DONY",
};

export const headerInfo = createSlice({
  name: "headerInfo",
  initialState,
  reducers: {
    setHeaderInfo: (state, action) => {
      return {
        productName: action.payload.productName,
        factoryName: action.payload.factoryName,
      };
    },
    resetHeaderInfo: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHeaderInfo, resetHeaderInfo } = headerInfo.actions;

export default headerInfo.reducer;

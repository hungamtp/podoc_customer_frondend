import { Blueprint } from "@/models/design/blueprint";
import { createSlice } from "@reduxjs/toolkit";

export interface HeaderInfoData {
  productName: string;
  factoryName: string;
  rawProductPrice: number;
  rawProductMaterial: string;
}

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

const initialState: HeaderInfoData = {
  productName: "Áo thun châu Á",
  factoryName: "DONY",
  rawProductPrice: 100000,
  rawProductMaterial: "Cotton",
};

export const headerInfo = createSlice({
  name: "headerInfo",
  initialState,
  reducers: {
    setHeaderInfo: (state, action) => {
      return {
        productName: action.payload.productName,
        factoryName: action.payload.factoryName,
        rawProductPrice: action.payload.rawProductPrice,
        rawProductMaterial: action.payload.rawProductMaterial,
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

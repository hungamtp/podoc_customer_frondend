import { createSlice } from "@reduxjs/toolkit";

export interface DesignProductInfo {
  id: string;
  designedPrice: number;
  description: string;
  name: string;
}

const initialState: DesignProductInfo = {
  id: "",
  designedPrice: 10000,
  description: "",
  name: "string",
};

export const designProductInfoSlice = createSlice({
  name: "designProductInfo",
  initialState,
  reducers: {
    setDesignedProductInfo: (state, action) => {
      return action.payload;
    },
    resetDesignedProductInfo: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDesignedProductInfo, resetDesignedProductInfo } =
  designProductInfoSlice.actions;

export default designProductInfoSlice.reducer;

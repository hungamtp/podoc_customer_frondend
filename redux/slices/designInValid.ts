import { createSlice } from "@reduxjs/toolkit";

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

interface DesignInvalid {
  designName: string;
  isValid: boolean;
}

const initialState: DesignInvalid = {
  designName: "",
  isValid: false,
};

export const designInValid = createSlice({
  name: "designInValid",
  initialState,
  reducers: {
    setIsDesignInvalid: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsDesignInvalid } = designInValid.actions;

export default designInValid.reducer;

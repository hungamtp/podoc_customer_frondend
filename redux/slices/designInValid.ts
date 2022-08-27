import { createSlice } from "@reduxjs/toolkit";

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

const initialState: string[] = [];
export const designInValid = createSlice({
  name: "designInValid",
  initialState,
  reducers: {
    setIsDesignInvalid: (state, action) => {
      return action.payload;
    },
    resetIsDesignInvalid: () => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsDesignInvalid, resetIsDesignInvalid } =
  designInValid.actions;

export default designInValid.reducer;

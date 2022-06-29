import { createSlice } from "@reduxjs/toolkit";

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống

const initialState = false;

export const isEdit = createSlice({
  name: "isEdit",
  initialState,
  reducers: {
    setIsEdit: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsEdit } = isEdit.actions;

export default isEdit.reducer;

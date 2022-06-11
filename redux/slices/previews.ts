import { Blueprint } from "@/models/design/blueprint";
import { createSlice } from "@reduxjs/toolkit";

// isEmpty: render ra trang trống
// isSetImage: bảng chọn hình
// isChooseImage: mở bảng chọn hình từ trang trống
interface Preview {
  position: string;
  imageSrc: string;
}

const initialState: Preview[] = [
  {
    position: "front",
    imageSrc: "",
  },
];

export const previews = createSlice({
  name: "previews",
  initialState,
  reducers: {
    setPreview: (state, action) => {
      state = state.map((preview) => {
        // console.log(action.payload.choosenKey === designInfo.key, 'chay nee');
        if (preview.position === action.payload.position) {
          return {
            ...preview,
            imageSrc: action.payload.imageSrc,
          };
        }
        return preview;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPreview } = previews.actions;

export default previews.reducer;

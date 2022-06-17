import { createSlice } from "@reduxjs/toolkit";
import { CartDetailDTO } from "@/services/type.dto";
 

const initialState: CartDetailDTO[] = [];

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

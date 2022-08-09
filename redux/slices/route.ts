import { createSlice } from "@reduxjs/toolkit";
import { CartNotEnoughQuantity } from "@/services/type.dto";

const initialState: string = "";

export const routeCart = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoute } = routeCart.actions;

export default routeCart.reducer;

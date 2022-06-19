import { createSlice } from "@reduxjs/toolkit";
import { CartDetailDTO } from "@/services/type.dto";
 

const initialState: CartDetailDTO[] = [
 
];

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return action.payload ;
    },
    deleteCartDetail: (state , action) => {
       return state.filter((cart : CartDetailDTO) => cart.id != action.payload);
    },
    updateQuantityCartDetail : (state , action) =>{

      const cartIndex = state.findIndex((cart: CartDetailDTO) => cart.id == action.payload.id);
      state[cartIndex].quantity = action.payload.quantity;
      return state;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCart , deleteCartDetail  , updateQuantityCartDetail} = cartSlice.actions;

export default cartSlice.reducer;

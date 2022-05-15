import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  email: string;
  phone: string;
  username: string;
  fullName: string;
  role: string;
}

const initialState: SearchState = {
  email: "",
  phone: "",
  username: "",
  fullName: "",
  role: "",
};

export const searchSlice = createSlice({
  name: "searchValue",
  initialState,
  reducers: {
    setValue: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.username = action.payload.username;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue } = searchSlice.actions;

export default searchSlice.reducer;

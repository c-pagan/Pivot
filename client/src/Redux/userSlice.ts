import { createSlice /* PayloadAction */ } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: Boolean;
  user: {};
}

const initialState: UserState = {
  isLoggedIn: false,
  user: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setSingleUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setSingleUser } =
  userSlice.actions;

export default userSlice.reducer;

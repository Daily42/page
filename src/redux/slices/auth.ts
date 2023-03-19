import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthData {
  auth: boolean;
  auth2f: boolean;
  isRequire2f: boolean;
}

export const auth = createSlice({
  name: "auth",
  initialState: {
    auth: false, // Set true for test on local without auth.
  } as AuthData,
  reducers: {
    // eslint-disable-next-line no-return-assign
    setAuth: (state, action: PayloadAction<AuthData>) => {
      state.auth = action.payload.auth;
    },
  }
});

export const { setAuth } = auth.actions;
export default auth.reducer;

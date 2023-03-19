import { combineReducers } from "@reduxjs/toolkit";
import loggedUser from "./slices/loggedUser";
import auth from "./slices/auth";

const reducer = combineReducers({
  loggedUser,
  auth,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;

import { combineReducers } from "@reduxjs/toolkit";
import { appApi } from "@/services/api/appApi";
import authReducer from "@/app/features/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [appApi.reducerPath]: appApi.reducer,
});

export default rootReducer;

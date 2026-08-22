import { combineReducers } from "@reduxjs/toolkit";
import { appApi } from "@/services/api/appApi";
import authReducer from "@/app/features/auth/authSlice";
import uiReducer from "@/app/features/ui/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  [appApi.reducerPath]: appApi.reducer,
});

export default rootReducer;

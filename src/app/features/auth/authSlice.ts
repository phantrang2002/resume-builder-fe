import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, SessionPayload } from "@/app/features/auth/authTypes";

const initialState: AuthState = {
  session: null,
  isBootstrapped: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionPayload | null>) => {
      state.session = action.payload;
    },
    markBootstrapped: (state) => {
      state.isBootstrapped = true;
    },
    clearSession: (state) => {
      state.session = null;
      state.isBootstrapped = true;
    },
  },
});

export const { clearSession, markBootstrapped, setSession } = authSlice.actions;
export default authSlice.reducer;

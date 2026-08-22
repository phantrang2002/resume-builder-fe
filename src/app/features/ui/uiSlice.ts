import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  globalLoadingCount: number;
};

const initialState: UiState = {
  globalLoadingCount: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.globalLoadingCount += 1;
    },
    stopLoading: (state) => {
      state.globalLoadingCount = Math.max(0, state.globalLoadingCount - 1);
    },
  },
});

export const { startLoading, stopLoading } = uiSlice.actions;
export const selectIsGlobalLoading = (state: { ui: UiState }) => state.ui.globalLoadingCount > 0;
export default uiSlice.reducer;

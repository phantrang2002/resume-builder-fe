import { configureStore, isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import rootReducer from "@/app/store/rootReducer";
import { appApi } from "@/services/api/appApi";
import { HTTP_STATUS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";

const apiErrorListenerMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = (action.payload as { status?: number } | undefined)?.status;
    if (status !== HTTP_STATUS.UNAUTHORIZED) {
      toast.error(getApiErrorMessage(action.payload));
    }
  }
  return next(action);
};

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(apiErrorListenerMiddleware)
      .concat(appApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

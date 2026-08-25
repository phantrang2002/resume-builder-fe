import { configureStore, isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { toast } from "@/shared/helpers/toast";
import rootReducer from "@/app/store/rootReducer";
import { appApi } from "@/services/api/appApi";
import { HTTP_STATUS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";

const apiErrorListenerMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = (action.payload as { status?: number } | undefined)?.status;
    const endpointName = (
      action.meta as { arg?: { endpointName?: string } } | undefined
    )?.arg?.endpointName;
    // Login failures are shown inline via FormAlert — skip duplicate toast.
    // getResumes failures are shown inline on the resumes page.
    if (
      status !== HTTP_STATUS.UNAUTHORIZED &&
      endpointName !== "login" &&
      endpointName !== "getResumes"
    ) {
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

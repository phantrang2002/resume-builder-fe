import { clearSession, setSession } from "@/app/features/auth/authSlice";
import { profileToSession } from "@/app/features/auth/authTypes";
import { appApi } from "@/services/api/appApi";
import { API_ENDPOINT, HTTP_METHOD } from "@/shared/constants";
import { setAccessToken } from "@/shared/helpers";
import type {
  DataResponse,
  ForgotPasswordParams,
  LoginParams,
  LoginResponseData,
  RefreshResponseData,
  ResetPasswordParams,
  SignupParams,
  SignupResponseData,
  UserProfile,
} from "@/shared/types";

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLazyGetProfileQuery,
  useGetProfileQuery,
} = appApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<DataResponse<LoginResponseData>, LoginParams>({
      query: (body) => ({
        url: API_ENDPOINT.AUTH_LOGIN,
        method: HTTP_METHOD.POST,
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data: envelope } = await queryFulfilled;
          const access = envelope.data?.token?.access;
          if (access) {
            setAccessToken(access);
          }
        } catch {
          /* handled by caller */
        }
      },
    }),

    signup: builder.mutation<DataResponse<SignupResponseData>, SignupParams>({
      query: (body) => ({
        url: API_ENDPOINT.AUTH_SIGNUP,
        method: HTTP_METHOD.POST,
        body,
      }),
    }),

    refreshToken: builder.mutation<DataResponse<RefreshResponseData>, void>({
      query: () => ({
        url: API_ENDPOINT.AUTH_REFRESH,
        method: HTTP_METHOD.POST,
        body: {},
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data: envelope } = await queryFulfilled;
          const access = envelope.data?.token?.access;
          if (access) {
            setAccessToken(access);
          }
        } catch {
          /* handled by caller */
        }
      },
    }),

    logout: builder.mutation<DataResponse<unknown>, void>({
      query: () => ({
        url: API_ENDPOINT.AUTH_LOGOUT,
        method: HTTP_METHOD.POST,
      }),
    }),

    getProfile: builder.query<DataResponse<UserProfile>, void>({
      query: () => ({
        url: API_ENDPOINT.AUTH_ME,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ["Profile"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: envelope } = await queryFulfilled;
          if (envelope.data) {
            dispatch(setSession(profileToSession(envelope.data)));
          }
        } catch {
          dispatch(clearSession());
        }
      },
    }),

    forgotPassword: builder.mutation<DataResponse<unknown>, ForgotPasswordParams>({
      query: (body) => ({
        url: API_ENDPOINT.AUTH_FORGOT_PASSWORD,
        method: HTTP_METHOD.POST,
        body,
      }),
    }),

    resetPassword: builder.mutation<DataResponse<unknown>, ResetPasswordParams>({
      query: (body) => ({
        url: API_ENDPOINT.AUTH_RESET_PASSWORD,
        method: HTTP_METHOD.POST,
        body,
      }),
    }),
  }),
});

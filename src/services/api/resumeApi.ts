import { appApi } from "@/services/api/appApi";
import { API_ENDPOINT, HTTP_METHOD } from "@/shared/constants";
import type { CreateResumeData, CreateResumeParams, DataResponse } from "@/shared/types";

export const { useCreateResumeMutation } = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createResume: builder.mutation<DataResponse<CreateResumeData>, CreateResumeParams>({
      query: (body) => ({
        url: API_ENDPOINT.RESUMES,
        method: HTTP_METHOD.POST,
        body,
      }),
    }),
  }),
});

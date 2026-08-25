import { appApi } from "@/services/api/appApi";
import { API_ENDPOINT, HTTP_METHOD } from "@/shared/constants";
import type {
  CreateResumeData,
  CreateResumeParams,
  DataResponse,
  GetResumesParams,
  ResumeListItem,
  ResumesData,
} from "@/shared/types";

export const {
  useCreateResumeMutation,
  useGetResumesQuery,
  useGetResumeByIdQuery,
} = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createResume: builder.mutation<DataResponse<CreateResumeData>, CreateResumeParams>({
      query: (body) => ({
        url: API_ENDPOINT.RESUMES,
        method: HTTP_METHOD.POST,
        body,
      }),
      invalidatesTags: [{ type: "Resumes", id: "LIST" }],
    }),

    getResumes: builder.query<DataResponse<ResumesData>, GetResumesParams | void>({
      query: (params) => ({
        url: API_ENDPOINT.RESUMES,
        method: HTTP_METHOD.GET,
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: "Resumes" as const, id })),
              { type: "Resumes", id: "LIST" },
            ]
          : [{ type: "Resumes", id: "LIST" }],
    }),

    getResumeById: builder.query<DataResponse<ResumeListItem>, number>({
      query: (id) => ({
        url: `${API_ENDPOINT.RESUMES}/${id}`,
        method: HTTP_METHOD.GET,
      }),
      providesTags: (_result, _error, id) => [{ type: "Resumes", id }],
    }),
  }),
});

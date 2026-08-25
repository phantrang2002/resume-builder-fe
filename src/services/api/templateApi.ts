import { appApi } from "@/services/api/appApi";
import { API_ENDPOINT, HTTP_METHOD } from "@/shared/constants";
import type { DataResponse, ResumeTemplateDetail, TemplatesData } from "@/shared/types";

export const {
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
} = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<DataResponse<TemplatesData>, void>({
      query: () => ({
        url: API_ENDPOINT.TEMPLATES,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ["Templates"],
    }),

    getTemplateById: builder.query<DataResponse<ResumeTemplateDetail>, number>({
      query: (id) => ({
        url: `${API_ENDPOINT.TEMPLATES}/${id}`,
        method: HTTP_METHOD.GET,
      }),
      providesTags: (_result, _error, id) => [{ type: "Templates", id }],
    }),
  }),
});

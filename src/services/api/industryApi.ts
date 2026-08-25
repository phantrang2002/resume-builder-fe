import { appApi } from "@/services/api/appApi";
import { API_ENDPOINT, HTTP_METHOD } from "@/shared/constants";
import type { DataResponse, IndustriesData } from "@/shared/types";

export const { useGetIndustriesQuery } = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getIndustries: builder.query<DataResponse<IndustriesData>, void>({
      query: () => ({
        url: API_ENDPOINT.INDUSTRIES,
        method: HTTP_METHOD.GET,
      }),
      providesTags: ["Industries"],
    }),
  }),
});

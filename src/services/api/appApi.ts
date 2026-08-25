import { createApi } from "@reduxjs/toolkit/query/react";
import appBaseQuery from "@/services/api/baseQuery";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: appBaseQuery,
  tagTypes: ["Profile", "Industries", "Templates"],
  endpoints: () => ({}),
});

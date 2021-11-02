
// @ts-nocheck 


import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery, { API_URL, HEROKU_KEY } from './axiosBaseQuery';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: [
    // 'create_app',
  ],
  refetchOnReconnect: true,
  endpoints: (build) => ({
    createApp: build.mutation({
      query: (data: { name: string, stack: string }) => ({
        method: 'POST',
        url: `/apps`,
        headers: {
          "Accept": "application/vnd.heroku+json; version=3",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HEROKU_KEY}`
        },
        data: data
      }),
      // invalidatesTags: [''],
    }),
    createBuild: build.mutation({
      query: ({ name, build_data }) => ({
        method: 'POST',
        url: `/apps/${name}/builds`,
        headers: {
          "Accept": "application/vnd.heroku+json; version=3",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HEROKU_KEY}`
        },
        data: build_data
      }),
    }),
  }),
});

export const { useCreateAppMutation, useCreateBuildMutation } = api
export default api
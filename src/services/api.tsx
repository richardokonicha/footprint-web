
// @ts-nocheck 


import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery, { API_URL, HEROKU_KEY } from './axiosBaseQuery';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: [
    'create_app',
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
      invalidatesTags: ['create_app'],
    }),
  }),
});

export const { useCreateAppMutation } = api
export default api
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery, { API_URL, HEROKU_KEY } from './axiosBase';

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: ["appFormation"],
  refetchOnReconnect: true,
  endpoints: (build) => ({

    getAppFormation: build.query({
      query: (name: string) => ({
        method: 'GET',
        url: `/apps/${name}/formation/worker`,
        headers: {
          "Accept": "application/vnd.heroku+json; version=3",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HEROKU_KEY}`
        },
      }),
      providesTags: ['appFormation'],
    }),

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
    setConfigVars: build.mutation({
      query: ({ name, config_vars }) => ({
        method: 'PATCH',
        url: `/apps/${name}/config-vars`,
        headers: {
          "Accept": "application/vnd.heroku+json; version=3",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HEROKU_KEY}`
        },
        data: config_vars
      }),
    }),
    setFormation: build.mutation({
      query: ({ name, formation_data }) => ({
        method: 'PATCH',
        url: `/apps/${name}/formation`,
        headers: {
          "Accept": "application/vnd.heroku+json; version=3",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HEROKU_KEY}`
        },
        data: formation_data
      }),
      invalidatesTags: ['appFormation'],
    }),
  }),
});

export const { useCreateAppMutation, useCreateBuildMutation, useSetConfigVarsMutation, useSetFormationMutation, useGetAppFormationQuery } = api
export default api
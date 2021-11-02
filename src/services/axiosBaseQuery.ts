// @ts-nocheck 
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, headers, body, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        body,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };


// const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' }
//   ): BaseQueryFn<
//     {
//       url: string
//       method: AxiosRequestConfig['method']
//       data?: AxiosRequestConfig['data']
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data })
//       return { data: result.data }
//     } catch (axiosError) {
//       let err = axiosError as AxiosError
//       return {
//         error: { status: err.response?.status, data: err.response?.data },
//       }
//     }
//   }

// const api = createApi({
//   baseQuery: axiosBaseQuery({
//     baseUrl: 'http://example.com',
//   }),
//   endpoints(build) {
//     return {
//       query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
//       mutation: build.mutation({
//         query: () => ({ url: '/mutation', method: 'post' }),
//       }),
//     }
//   },
// })


export default axiosBaseQuery;
export const API_URL = process.env.REACT_APP_API_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const HEROKU_KEY = process.env.REACT_APP_HEROKU_KEY;

export const TELE_HASH = process.env.REACT_APP_TELE_HASH;
export const TELE_ID = process.env.REACT_APP_TELE_ID;
export const REDISTOGO_URL = process.env.REACT_APP_REDISTOGO_URL;
export const SESSION = process.env.REACT_APP_SESSION;


 
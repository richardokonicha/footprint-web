import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

interface AxiosBaseQueryProps {
  url: string, 
  method: AxiosRequestConfig['method'], 
  data?: AxiosRequestConfig['data'], 
  headers?: AxiosRequestConfig['headers'],  
  params?: AxiosRequestConfig['params']
}

const axiosBaseQuery = ({ baseUrl } : { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<AxiosBaseQueryProps> =>
  async ({ url, method, data, headers, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };


export default axiosBaseQuery;
export const API_URL = process.env.REACT_APP_API_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const HEROKU_KEY = process.env.REACT_APP_HEROKU_KEY;

export const TELE_HASH = process.env.REACT_APP_TELE_HASH;
export const TELE_ID = process.env.REACT_APP_TELE_ID;
export const REDISTOGO_URL = process.env.REACT_APP_REDISTOGO_URL;
export const SESSION = process.env.REACT_APP_SESSION;


 
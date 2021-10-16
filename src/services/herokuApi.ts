
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { alphabetizeItems } from '../../helpers/data-manip';
import axiosBaseQuery, { API_URL, API_CALC_URL } from './axiosBaseQuery';



// import { alphabetizeItems } from '../../helpers/data-manip';
// import axiosBaseQuery, { API_URL, API_CALC_URL } from './axiosBaseQuery';


// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  // baseQuery: axiosBaseQuery({
  //   baseUrl: `${API_URL}`,
  // }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = pokemonApi



// export const collectionsApi = createApi({
//   reducerPath: 'collectionsApi',
//   baseQuery: axiosBaseQuery({
//     baseUrl: `${API_URL}`,
//   }),
//   tagTypes: [
//     'heroku',
//   ],
//   refetchOnReconnect: true,
//   endpoints: (build) => ({
//     getCollections: build.query<any, number>({
//       query: (token) => ({
//         method: 'get',
//         url: `/collections`,
//         headers: {
//           'x-access-token': token['x-access-token'],
//         },
//         params: {
//           route: 'get_all',
//         },
//       }),
//       transformResponse: (response) => response,
//       providesTags: ['heroku'],
//     }),
// }),
// });






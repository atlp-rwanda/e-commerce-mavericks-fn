import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mavericksApi = createApi({
  reducerPath: 'mavericksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https:localhost:8080/api/',
  }),
  endpoints: () => ({}),
});

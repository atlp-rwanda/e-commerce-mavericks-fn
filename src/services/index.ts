import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mavericksApi = createApi({
  reducerPath: 'mavericksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://e-commerce-mavericcks-bn-staging-istf.onrender.com/api/',
  }),
  endpoints: () => ({}),
});


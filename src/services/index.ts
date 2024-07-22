import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';

export const mavericksApi = createApi({
  reducerPath: 'mavericksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mavericks.nijohn.dev/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('authorization', `${token.replace(/"/g, '')!}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Notifications', 'Carts', 'GetPro', "WishList"],

  endpoints: () => ({}),
});

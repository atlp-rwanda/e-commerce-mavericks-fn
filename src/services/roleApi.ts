import { mavericksApi } from '.';
import { Role } from '../types/Types';

export const roleApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getRoles: builder.query<{ data: Role[] }, void>({
      query: () => ({
        url: 'roles',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetRolesQuery } = roleApi;

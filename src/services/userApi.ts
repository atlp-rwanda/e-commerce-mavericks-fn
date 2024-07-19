import { mavericksApi } from '.';
import { User } from '../types/Types';

export const userApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: id => ({
        url: `users/user/${id}`,
      }),
    }),
    getUsers: builder.query<{ message: User[] }, void>({
      query: () => ({
        url: 'users',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getSellers: builder.query({
      query: () => ({
        url: 'users/role/seller',
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      }),
    }),
    getBuyers: builder.query<{ message: User[] }, void>({
      query: () => ({
        url: 'users/role/buyer',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    updateUserRole: builder.mutation<void, { userId: string; roleId: string }>({
      query: ({ userId, roleId }) => ({
        url: `users/role/${userId}`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: { roleId },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByIdQuery, useGetUsersQuery,useGetSellersQuery, useGetBuyersQuery, useUpdateUserRoleMutation } = userApi;

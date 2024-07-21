import { mavericksApi } from '.';
import { User } from '../types/Types';

const id = localStorage.getItem('user');

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
    updateUser: builder.mutation({
      query: data => ({
        url: `/users/edit/${id}`,
        method: 'PATCH',
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
        body: data,
        formData: true,
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

export const {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUsersQuery,
  useGetSellersQuery,
  useUpdateUserRoleMutation,
} = userApi;

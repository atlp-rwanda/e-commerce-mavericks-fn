import { mavericksApi } from '.';
import { User } from '../types/Types';

export const userApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: (userId) => {
        return {
          url: `users/user/${userId}`,
        }
      },
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
    updateUser: builder.mutation<User, { userId: string; data: FormData }>({
      query: ({ userId, data }) => {
        return {
          url: `users/edit/${userId}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserByIdQuery,
  useGetUsersQuery,
  useGetSellersQuery,
  useGetBuyersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserMutation,
} = userApi;

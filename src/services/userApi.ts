import { mavericksApi } from '.';
const id = localStorage.getItem('user');

export const userApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: id => ({
        url: `users/user/${id}`,
        headers: {
          authorization: localStorage.getItem('token') || '',
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
  }),

  overrideExisting: false,
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;

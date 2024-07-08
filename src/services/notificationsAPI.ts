import { mavericksApi } from '.';

const notificationsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query({
      query: userId => `notifications/${userId}`,
      providesTags: ['Notifications'],
    }),
    markNotificationAsRead: builder.mutation({
      query: ({ isRead, id }) => ({
        url: `notifications/${id}`,
        method: 'PATCH',
        body: { isRead },
      }),
    }),
    deleteSingleNotifications: builder.mutation({
      query: notificationID => ({
        url: `notifications/${notificationID}`,
        method: 'DELETE',
      }),
    }),
    deleteAllNotifications: builder.mutation({
      query: userId => ({
        url: `notifications/delete/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: ({ userId, isRead }) => ({
        url: `notifications/update/${userId}`,
        method: 'PATCH',
        body: { isRead },
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationsQuery,
  useDeleteAllNotificationsMutation,
  useDeleteSingleNotificationsMutation,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} = notificationsApi;

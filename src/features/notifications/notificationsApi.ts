import { baseApi } from '../api/baseApi';
import { Notification } from '../../types';

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => '/notifications',
      providesTags: ['Notification'],
    }),
    sendNotification: builder.mutation<Notification, { userId: string; title: string; message: string; type?: 'info' | 'success' | 'invite' }>({
      query: body => ({ url: '/notifications', method: 'POST', body }),
      invalidatesTags: ['Notification'],
    }),
    markNotificationAsRead: builder.mutation<Notification, string>({
      query: id => ({ url: `/notifications/${id}/read`, method: 'PATCH' }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const { useGetNotificationsQuery, useSendNotificationMutation, useMarkNotificationAsReadMutation } = notificationsApi;

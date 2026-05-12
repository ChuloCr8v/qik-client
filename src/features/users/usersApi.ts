import { baseApi } from '../api/baseApi';
import { User } from '../../types';

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    updateCurrentUser: builder.mutation<User, Partial<User>>({
      query: body => ({ url: '/users/me', method: 'PATCH', body }),
      invalidatesTags: ['User', 'Auth'],
    }),
    listUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation, useListUsersQuery } = usersApi;

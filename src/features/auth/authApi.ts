import { baseApi } from '../api/baseApi';
import { User } from '../../types';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    startEmailSignIn: builder.mutation<{ ok: boolean; message: string; devCode?: string }, { email: string }>({
      query: body => ({ url: '/auth/email/start', method: 'POST', body }),
      invalidatesTags: ['Auth'],
    }),
    verifyEmailSignIn: builder.mutation<{ token: string; user: User }, { email: string; code: string }>({
      query: body => ({ url: '/auth/email/verify', method: 'POST', body }),
      invalidatesTags: ['Auth'],
    }),
    googleSignIn: builder.mutation<{ token: string; user: User }, { credential: string }>({
      query: body => ({ url: '/auth/google', method: 'POST', body }),
      invalidatesTags: ['Auth'],
    }),
    getMe: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useStartEmailSignInMutation,
  useVerifyEmailSignInMutation,
  useGoogleSignInMutation,
  useGetMeQuery,
} = authApi;

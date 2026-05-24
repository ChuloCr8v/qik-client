import { baseApi } from '../api/baseApi';

export const teamApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    inviteTeamMember: builder.mutation<{ ok: boolean }, { email: string; role: string }>({
      query: body => ({ url: '/team/invite', method: 'POST', body }),
      invalidatesTags: ['Billing', 'User'],
    }),
  }),
});

export const { useInviteTeamMemberMutation } = teamApi;

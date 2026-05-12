import { baseApi } from '../api/baseApi';
import { AgendaItem, Meeting, Participant, PublicMeetingSummary } from '../../types';
import { MeetingTemplate } from '../../constants/templates';

export const meetingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMeetings: builder.query<Meeting[], void>({
      query: () => '/meetings',
      providesTags: ['Meeting'],
    }),
    createMeeting: builder.mutation<Meeting, { title?: string; description?: string; template?: MeetingTemplate; scheduledAt?: string; invitees?: string[]; isPublic?: boolean }>({
      query: body => ({ url: '/meetings', method: 'POST', body }),
      invalidatesTags: ['Meeting', 'Notification'],
    }),
    getMeeting: builder.query<Meeting, string>({
      query: id => `/meetings/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Meeting', id }],
    }),
    getPublicMeetingSummary: builder.query<PublicMeetingSummary, string>({
      query: id => `/public/meetings/${id}`,
    }),
    updateMeeting: builder.mutation<Meeting, { id: string; data: Partial<Meeting> }>({
      query: ({ id, data }) => ({ url: `/meetings/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Meeting', id }, 'Meeting'],
    }),
    deleteMeeting: builder.mutation<{ ok: boolean }, string>({
      query: id => ({ url: `/meetings/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Meeting'],
    }),
    getAgenda: builder.query<AgendaItem[], string>({
      query: meetingId => `/meetings/${meetingId}/agenda`,
      providesTags: ['Agenda'],
    }),
    addAgendaItem: builder.mutation<AgendaItem, { meetingId: string; item: Partial<AgendaItem> }>({
      query: ({ meetingId, item }) => ({ url: `/meetings/${meetingId}/agenda`, method: 'POST', body: item }),
      invalidatesTags: ['Agenda'],
    }),
    updateAgendaItem: builder.mutation<AgendaItem, { meetingId: string; itemId: string; data: Partial<AgendaItem> }>({
      query: ({ meetingId, itemId, data }) => ({ url: `/meetings/${meetingId}/agenda/${itemId}`, method: 'PATCH', body: data }),
      invalidatesTags: ['Agenda'],
    }),
    deleteAgendaItem: builder.mutation<{ ok: boolean }, { meetingId: string; itemId: string }>({
      query: ({ meetingId, itemId }) => ({ url: `/meetings/${meetingId}/agenda/${itemId}`, method: 'DELETE' }),
      invalidatesTags: ['Agenda'],
    }),
    reorderAgenda: builder.mutation<AgendaItem[], { meetingId: string; items: AgendaItem[] }>({
      query: ({ meetingId, items }) => ({ url: `/meetings/${meetingId}/agenda/reorder`, method: 'PATCH', body: { items } }),
      invalidatesTags: ['Agenda'],
    }),
    startMeeting: builder.mutation<Meeting, string>({
      query: id => ({ url: `/meetings/${id}/start`, method: 'POST' }),
      invalidatesTags: ['Meeting'],
    }),
    stopMeeting: builder.mutation<Meeting, string>({
      query: id => ({ url: `/meetings/${id}/stop`, method: 'POST' }),
      invalidatesTags: ['Meeting'],
    }),
    sendMeetingInvite: builder.mutation<{ ok: boolean; meeting: Meeting }, { meetingId: string; email: string }>({
      query: ({ meetingId, email }) => ({ url: `/meetings/${meetingId}/invite`, method: 'POST', body: { email } }),
      invalidatesTags: (_r, _e, { meetingId }) => [{ type: 'Meeting', id: meetingId }, 'Meeting'],
    }),
    sendMeetingReminders: builder.mutation<{ ok: boolean; sent: number }, string>({
      query: id => ({ url: `/meetings/${id}/reminders`, method: 'POST' }),
    }),
    updateMeetingProgress: builder.mutation<Meeting, { meetingId: string; data: Partial<Meeting> }>({
      query: ({ meetingId, data }) => ({ url: `/meetings/${meetingId}/progress`, method: 'PATCH', body: data }),
      invalidatesTags: ['Meeting'],
    }),
    updatePresence: builder.mutation<Participant, string>({
      query: meetingId => ({ url: `/meetings/${meetingId}/presence`, method: 'POST' }),
      invalidatesTags: ['Participant'],
    }),
    leaveMeeting: builder.mutation<{ ok: boolean }, string>({
      query: meetingId => ({ url: `/meetings/${meetingId}/presence`, method: 'DELETE' }),
      invalidatesTags: ['Participant'],
    }),
    getParticipants: builder.query<Participant[], string>({
      query: meetingId => `/meetings/${meetingId}/participants`,
      providesTags: ['Participant'],
    }),
  }),
});

export const {
  useGetMeetingsQuery,
  useCreateMeetingMutation,
  useGetMeetingQuery,
  useGetPublicMeetingSummaryQuery,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
  useGetAgendaQuery,
  useAddAgendaItemMutation,
  useUpdateAgendaItemMutation,
  useDeleteAgendaItemMutation,
  useReorderAgendaMutation,
  useStartMeetingMutation,
  useStopMeetingMutation,
  useSendMeetingInviteMutation,
  useSendMeetingRemindersMutation,
  useUpdateMeetingProgressMutation,
  useUpdatePresenceMutation,
  useLeaveMeetingMutation,
  useGetParticipantsQuery,
} = meetingsApi;

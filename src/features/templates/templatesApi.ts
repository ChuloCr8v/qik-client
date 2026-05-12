import { baseApi } from '../api/baseApi';
import { MeetingTemplate } from '../../constants/templates';

export const templatesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTemplates: builder.query<(MeetingTemplate & { id: string })[], void>({
      query: () => '/templates',
      providesTags: ['Template'],
    }),
    addTemplate: builder.mutation<MeetingTemplate & { id: string }, Omit<MeetingTemplate, 'id'>>({
      query: body => ({ url: '/templates', method: 'POST', body }),
      invalidatesTags: ['Template'],
    }),
    updateTemplate: builder.mutation<MeetingTemplate & { id: string }, { id: string; data: Partial<MeetingTemplate> }>({
      query: ({ id, data }) => ({ url: `/templates/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['Template'],
    }),
    deleteTemplate: builder.mutation<{ ok: boolean }, string>({
      query: id => ({ url: `/templates/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Template'],
    }),
  }),
});

export const { useGetTemplatesQuery, useAddTemplateMutation, useUpdateTemplateMutation, useDeleteTemplateMutation } = templatesApi;

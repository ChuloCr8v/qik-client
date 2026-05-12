import React, { createContext, useContext, useMemo } from 'react';
import { Meeting } from '../../types';
import { MeetingTemplate } from '../../constants/templates';
import { useAuth } from '../auth/AuthProvider';
import {
  useCreateMeetingMutation,
  useDeleteMeetingMutation,
  useGetMeetingsQuery,
} from './meetingsApi';

interface CreateMeetingInput {
  title?: string;
  template?: MeetingTemplate;
  scheduledAt?: string;
  invitees?: string[];
}

interface MeetingsContextValue {
  meetings: Meeting[];
  isLoadingMeetings: boolean;
  isCreatingMeeting: boolean;
  refreshMeetings: () => Promise<void>;
  createNewMeeting: (input: CreateMeetingInput) => Promise<string>;
  deleteMeetingById: (id: string) => Promise<void>;
}

const MeetingsContext = createContext<MeetingsContextValue | undefined>(undefined);

export function MeetingsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { data: meetings = [], isFetching, refetch } = useGetMeetingsQuery(undefined, { skip: !user });
  const [createMeeting, { isLoading: isCreatingMeeting }] = useCreateMeetingMutation();
  const [deleteMeeting] = useDeleteMeetingMutation();

  const refreshMeetings = async () => {
    if (user) await refetch();
  };

  const createNewMeeting = async (input: CreateMeetingInput) => {
    const meeting = await createMeeting(input).unwrap();
    return meeting.id;
  };

  const deleteMeetingById = async (id: string) => {
    await deleteMeeting(id).unwrap();
  };

  const value = useMemo(
    () => ({
      meetings,
      isLoadingMeetings: isFetching,
      isCreatingMeeting,
      refreshMeetings,
      createNewMeeting,
      deleteMeetingById,
    }),
    [meetings, isFetching, isCreatingMeeting]
  );

  return <MeetingsContext.Provider value={value}>{children}</MeetingsContext.Provider>;
}

export function useMeetings() {
  const context = useContext(MeetingsContext);
  if (!context) {
    throw new Error('useMeetings must be used within a MeetingsProvider');
  }
  return context;
}

import {
  DropResult
} from '@hello-pangea/dnd';
import toast from 'react-hot-toast';
import {
  MeetingTemplate
} from '../../../constants/templates';
import {
  useAddAgendaItemMutation,
  useReorderAgendaMutation,
  useSendMeetingInviteMutation,
  useSendMeetingRemindersMutation,
  useStartMeetingMutation,
  useStopMeetingMutation,
  useUpdateAgendaItemMutation,
  useUpdateMeetingMutation,
  useUpdateMeetingProgressMutation,
} from '../../../features/meetings/meetingsApi';
import {
  AgendaItem,
  Meeting
} from '../../../types';

type UseMeetingActionsInput = {
  meetingId: string;
  meeting: Meeting | null;
  agenda: AgendaItem[];
  setAgenda: (agenda: AgendaItem[]) => void;
  setIsCopying: (isCopying: boolean) => void;
};

export function useMeetingActions({
  meetingId,
  meeting,
  agenda,
  setAgenda,
  setIsCopying,
}: UseMeetingActionsInput) {
  const [addAgendaItem] = useAddAgendaItemMutation();
  const [updateAgendaItem] = useUpdateAgendaItemMutation();
  const [reorderAgendaItems] = useReorderAgendaMutation();
  const [startMeeting] = useStartMeetingMutation();
  const [stopMeeting] = useStopMeetingMutation();
  const [sendMeetingInvite] = useSendMeetingInviteMutation();
  const [sendMeetingReminders] = useSendMeetingRemindersMutation();
  const [updateMeetingProgress] = useUpdateMeetingProgressMutation();
  const [updateMeeting] = useUpdateMeetingMutation();

  const handleAddItem = async (data: {
    title: string; description: string; duration: number
  }) => {
    await addAgendaItem( {
      meetingId, item: {
        ...data, order: agenda.length
      }
    });
  };

  const handleUpdateItem = async (
    editingItem: AgendaItem | null,
    data: {
      title: string; description: string; duration: number
    },
  ) => {
    if (!editingItem) return;
    await updateAgendaItem( {
      meetingId, itemId: editingItem.id, data
    });
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = [...agenda];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAgenda(items);
    reorderAgendaItems( {
      meetingId, items
    }).unwrap().catch(error => {
      console.error(error);
      toast.error('Unable to reorder agenda items.');
    });
  };

  const handleSendReminders = async () => {
    if (!meeting?.invitees?.length) {
      toast.error('No invitees found for this meeting.');
      return;
    }

    try {
      const result = await sendMeetingReminders(meetingId).unwrap();
      toast.success(`Sent ${result.sent} reminder${result.sent === 1 ? '': 's'}.`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to send reminders.');
    }
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.origin);
    url.searchParams.set('m', meetingId);
    navigator.clipboard.writeText(url.toString());
    setIsCopying(true);
    toast.success('Invite link copied.');
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleStartMeeting = async () => {
    if (agenda.length === 0) {
      toast.error('Add at least one item to the agenda first.');
      return;
    }
    try {
      await startMeeting(meetingId).unwrap();
      toast.success('Meeting is live.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to start meeting.');
    }
  };

  const applyTemplate = async (template: MeetingTemplate, scheduledAt?: string) => {
    try {
      if (scheduledAt) {
        await updateMeetingProgress( {
          meetingId, data: {
            scheduledAt
          }
        }).unwrap();
      }

      const createdItems: AgendaItem[] = [];
      for (let i = 0; i < template.items.length; i++) {
        const createdItem = await addAgendaItem( {
          meetingId, item: {
            ...template.items[i], order: agenda.length + i
          }
        }).unwrap();
        createdItems.push(createdItem);
      }

      setAgenda([...agenda, ...createdItems]);
      toast.success('Template applied.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to apply template.');
    }
  };

  const handleAddInvitee = async (email: string) => {
    try {
      if (!meeting) return;
      const normalizedEmail = email.trim().toLowerCase();
      await sendMeetingInvite( {
        meetingId, email: normalizedEmail
      }).unwrap();
      toast.success('Invitation sent.');
    } catch (error) {
      console.error(error);
      toast.error((error as any)?.data?.message || 'Unable to send invite.');
    }

  };

  const handleTogglePublic = async () => {
    if (!meeting) return;
    try {
      await updateMeeting( {
        id: meetingId, data: {
          isPublic: !meeting.isPublic
        }
      }).unwrap();
      toast.success(meeting.isPublic ? 'Meeting is now private.': 'Meeting is now public.');
    } catch (error) {
      console.error(error);
      toast.error('Unable to update meeting visibility.');
    }
  };

  return {
    handleAddItem,
    handleUpdateItem,
    handleOnDragEnd,
    handleSendReminders,
    handleCopyLink,
    handleStartMeeting,
    handleStopMeeting: async () => {
      try {
        await stopMeeting(meetingId).unwrap();
        toast.success('Meeting ended.');
      } catch (error) {
        console.error(error);
        toast.error('Unable to end meeting.');
      }
    },
    applyTemplate,
    handleAddInvitee,
    handleTogglePublic,
  };
}
